/**
 * Configuration for {@link retryUntil}.
 */
export interface RetryOptions {
  /**
   * When `true`, retries never stop due to timeouts.
   */
  retryIndefinitely?: boolean;

  /**
   * Total time budget for retries (ignored when {@link RetryOptions.retryIndefinitely} is `true`).
   */
  timeoutMs?: number;

  /**
   * Initial retry delay in milliseconds.
   */
  initialDelayMs?: number;

  /**
   * Maximum retry delay in milliseconds.
   */
  maxDelayMs?: number;

  /**
   * Backoff multiplier applied after each attempt.
   */
  backoffFactor?: number;

  /**
   * Whether to accelerate retries by reacting to DOM mutations.
   */
  observeMutations?: boolean;

  /**
   * Root node for {@link MutationObserver} when {@link RetryOptions.observeMutations} is enabled.
   */
  observerRoot?: Node | null;
}

/**
 * A handle returned from {@link retryUntil}.
 */
export interface RetryHandle {
  /**
   * Stops future retries and disconnects any mutation observers.
   */
  cancel(): void;
}

/**
 * Repeatedly calls `callback` until it returns `true` or the retry budget is exhausted.
 *
 * @remarks
 * - `callback` is invoked immediately once.
 * - If it returns `false`, the call is retried with exponential backoff.
 * - When `observeMutations` is enabled, a {@link MutationObserver} can trigger extra attempts.
 *
 * @param callback - Returns `true` when the operation succeeded.
 * @param options - Retry configuration.
 * @returns A cancelable handle.
 */
export function retryUntil(callback: () => boolean, options: RetryOptions = {}): RetryHandle {
  const {
    retryIndefinitely = false,
    timeoutMs = 5 * 60 * 1000,
    initialDelayMs = 200,
    maxDelayMs = 5 * 1000,
    backoffFactor = 1.5,
    observeMutations = true,
    observerRoot = document.documentElement ?? document.body
  } = options;

  let active = true;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let delayMs = initialDelayMs;
  let observer: MutationObserver | undefined;

  const cleanup = (): void => {
    clearTimeout(timeoutId);
    observer?.disconnect();
    timeoutId = undefined;
    observer = undefined;
  };

  const cancel = (): void => {
    if (!active) return;
    active = false;
    cleanup();
  };

  const handle: RetryHandle = { cancel };

  const callIfActive = (): boolean => {
    return active && callback();
  };

  if (callIfActive()) {
    cancel();
    return handle;
  }

  const deadline = Date.now() + timeoutMs;

  const scheduleNextAttempt = (): void => {
    if (!active) return;

    const currentDelayMs = delayMs;
    delayMs = Math.min(maxDelayMs, Math.round(delayMs * backoffFactor));

    if (retryIndefinitely) {
      timeoutId = setTimeout(attempt, currentDelayMs);
      return;
    }

    const now = Date.now();

    if (now >= deadline) {
      cancel();
      return;
    }

    const remainingMs = deadline - now;
    const nextDelayMs = Math.min(currentDelayMs, remainingMs);
    timeoutId = setTimeout(attempt, nextDelayMs);
  };

  const attempt = (): void => {
    if (!active) return;

    if (callIfActive()) {
      cancel();
      return;
    }

    scheduleNextAttempt();
  };

  if (observeMutations && observerRoot) {
    let pending = false;

    observer = new MutationObserver(() => {
      if (pending || !active) return;

      pending = true;

      queueMicrotask(() => {
        if (!active) return;
        pending = false;
        if (callIfActive()) cancel();
      });
    });

    observer.observe(observerRoot, { childList: true, subtree: true });
  }

  scheduleNextAttempt();
  return handle;
}
