import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { openYouTubeTv } from '../src/tv/launcher';

describe('openYouTubeTv', () => {
  const createTab = vi.fn().mockResolvedValue(undefined);
  const createWindow = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('browser', {
      tabs: { create: createTab },
      windows: { create: createWindow }
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    { incognito: false, windowId: 41 },
    { incognito: true, windowId: 42 }
  ])('opens a tab in source window $windowId (incognito: $incognito)', async context => {
    await openYouTubeTv(
      '/watch?v=abc&t=10',
      { openInNewWindow: false, openInFullscreen: true },
      context.incognito,
      context.windowId
    );

    expect(createTab).toHaveBeenCalledExactlyOnceWith({
      url: 'https://www.youtube.com/tv/watch?v=abc&t=10',
      active: true,
      windowId: context.windowId
    });
    expect(createWindow).not.toHaveBeenCalled();
  });

  it('uses the current window when no source window ID is provided', async () => {
    await openYouTubeTv('', { openInNewWindow: false, openInFullscreen: false });

    expect(createTab).toHaveBeenCalledExactlyOnceWith({
      url: 'https://www.youtube.com/tv',
      active: true,
      windowId: undefined
    });
    expect(createWindow).not.toHaveBeenCalled();
  });

  it.each([
    { incognito: false, fullscreen: false },
    { incognito: true, fullscreen: true }
  ])(
    'creates a new window with incognito: $incognito and fullscreen: $fullscreen',
    async context => {
      await openYouTubeTv(
        '',
        { openInNewWindow: true, openInFullscreen: context.fullscreen },
        context.incognito,
        42
      );

      expect(createWindow).toHaveBeenCalledExactlyOnceWith({
        url: 'https://www.youtube.com/tv',
        state: context.fullscreen ? 'fullscreen' : undefined,
        focused: true,
        incognito: context.incognito
      });
      expect(createTab).not.toHaveBeenCalled();
    }
  );
});
