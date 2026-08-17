import { retryUntil } from '~/lib/retry';
import { messages } from '~/tv';

const OVERLAY_SELECTOR = 'yt-unified-overlay-stage';
const EXIT_ICON_SELECTOR = 'yt-icon';
const EXIT_ICON_CODEPOINT = 0xe37e;
const ESC_HOLD_TO_EXIT_MS = 3_000;

const BODY_CLASS_SELECTORS_FOR_EXIT: string[] = [
  'WEB_PAGE_TYPE_WELCOME',
  'WEB_PAGE_TYPE_ACCOUNT_SELECTOR'
];

/**
 * Content script entrypoint for YouTube TV pages (`/tv`).
 *
 * @remarks
 * - Watches for the exit overlay identified by YouTube's exit icon. When it appears, it sends a
 *   message to the background script to close the TV window.
 * - Also listens for the `Escape` key and closes the TV window when the page body has one of the
 *   {@link BODY_CLASS_SELECTORS_FOR_EXIT} classes.
 * - As a fallback, holding `Escape` for {@link ESC_HOLD_TO_EXIT_MS} ms closes the TV window even
 *   when the exit overlay is not available.
 */
export default defineContentScript({
  matches: ['https://*.youtube.com/tv*'],
  runAt: 'document_end',
  main() {
    window.addEventListener('keydown', handleEscKeydown, { capture: true });
    window.addEventListener('keyup', handleEscKeyup, { capture: true });
    window.addEventListener('blur', cancelEscHold);

    retryUntil(
      () => {
        const overlay = document.querySelector(OVERLAY_SELECTOR);

        if (!overlay) return false;

        handleExitOnExitScreen(overlay);
        return true;
      },
      {
        retryIndefinitely: true
      }
    );
  }
});

let requestAlreadySent = false;
let escIsPressed = false;
let escHoldTimeoutId: ReturnType<typeof setTimeout> | undefined;

function handleExitOnExitScreen(overlay: Element): void {
  retryUntil(
    () => {
      if (!isExitScreenDisplayed(overlay)) return false;

      sendExitRequestOnce();
      return true;
    },
    {
      retryIndefinitely: true,
      initialDelayMs: 3_000,
      maxDelayMs: 3_000,
      backoffFactor: 1,
      observerRoot: overlay
    }
  );
}

function handleEscKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape') return;
  if (escIsPressed) return;

  escIsPressed = true;
  escHoldTimeoutId = setTimeout(() => {
    sendExitRequestOnce();
  }, ESC_HOLD_TO_EXIT_MS);

  const existsInBody = (className: string) => document.body?.classList.contains(className);

  if (BODY_CLASS_SELECTORS_FOR_EXIT.some(existsInBody)) {
    sendExitRequestOnce();
  }
}

function handleEscKeyup(event: KeyboardEvent): void {
  if (event.key !== 'Escape') return;
  cancelEscHold();
}

function cancelEscHold(): void {
  escIsPressed = false;
  clearTimeout(escHoldTimeoutId);
  escHoldTimeoutId = undefined;
}

function sendExitRequestOnce(): void {
  if (requestAlreadySent) return;

  requestAlreadySent = true;
  cancelEscHold();
  browser.runtime.sendMessage(messages.CLOSE_SMART_TV);
}

function isExitScreenDisplayed(container: Element): boolean {
  const icons = Array.from(container.querySelectorAll(EXIT_ICON_SELECTOR));
  return icons.some(isExitIcon);
}

function isExitIcon(icon: Element): boolean {
  const beforeStyles = window.getComputedStyle(icon, '::before');
  const content = beforeStyles.content;

  if (!content || content === 'none') return false;

  const rawContent = content.slice(1, -1);

  if (!rawContent) return false;

  if (rawContent.startsWith('\\')) {
    const codepoint = Number.parseInt(rawContent.slice(1), 16);
    return codepoint === EXIT_ICON_CODEPOINT;
  }

  return rawContent.codePointAt(0) === EXIT_ICON_CODEPOINT;
}
