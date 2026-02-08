const OVERLAY_SELECTOR = 'yt-unified-overlay-stage';
const TEXT_ELEMENT_SELECTOR = 'yt-formatted-string';
const EXIT_HEADER_CONTENT = 'Exit YouTube';

const BODY_CLASS_SELECTORS_FOR_EXIT: string[] = [
  'WEB_PAGE_TYPE_WELCOME',
  'WEB_PAGE_TYPE_ACCOUNT_SELECTOR'
];

/**
 * Content script entrypoint for YouTube TV pages (`/tv`).
 *
 * @remarks
 * - Watches for the "Exit YouTube" overlay. When it appears, it sends a message to the background
 *   script to close the TV window.
 * - Also listens for the `Escape` key and closes the TV window when the page body has one of the
 *   {@link BODY_CLASS_SELECTORS_FOR_EXIT} classes.
 */
export default defineContentScript({
  matches: ['https://*.youtube.com/tv*'],
  runAt: 'document_end',
  main() {
    window.addEventListener('keydown', handleEscKeydown, { capture: true });

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

  const existsInBody = (className: string) => document.body?.classList.contains(className);

  if (!BODY_CLASS_SELECTORS_FOR_EXIT.some(existsInBody)) return;

  sendExitRequestOnce();
}

function sendExitRequestOnce(): void {
  if (requestAlreadySent) return;

  requestAlreadySent = true;
  browser.runtime.sendMessage(requests.CLOSE_SMART_TV);
}

function isExitScreenDisplayed(container: Element): boolean {
  const headers = container.querySelectorAll(TEXT_ELEMENT_SELECTOR);
  const expectedHeaderContent = EXIT_HEADER_CONTENT.toLowerCase();
  return Array.from(headers).some(
    header => header.textContent?.trim().toLowerCase() === expectedHeaderContent
  );
}
