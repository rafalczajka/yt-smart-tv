import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultOptions, getOptions, optionKeys, type Options, setOptions } from '../src/options';

const storageGet = vi.fn<(keys: string[]) => Promise<Partial<Options>>>();
const storageSet = vi.fn<(options: Partial<Options>) => Promise<void>>();

beforeEach(() => {
  storageGet.mockReset().mockResolvedValue({});
  storageSet.mockReset().mockResolvedValue(undefined);
  vi.stubGlobal('browser', {
    storage: {
      sync: { get: storageGet, set: storageSet }
    }
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getOptions', () => {
  it('returns defaults when no options are stored', async () => {
    await expect(getOptions()).resolves.toEqual(defaultOptions);
    expect(storageGet).toHaveBeenCalledWith(optionKeys);
  });

  it('merges stored options with defaults and preserves false values', async () => {
    storageGet.mockResolvedValue({ showPlayerButton: false, openInFullscreen: false });

    await expect(getOptions()).resolves.toEqual({
      ...defaultOptions,
      showPlayerButton: false,
      openInFullscreen: false
    });
  });

  it('reads the latest options on every call', async () => {
    storageGet
      .mockResolvedValueOnce({ showPlayerButton: false })
      .mockResolvedValueOnce({ showPlayerButton: true });

    await expect(getOptions()).resolves.toEqual({ ...defaultOptions, showPlayerButton: false });
    await expect(getOptions()).resolves.toEqual({ ...defaultOptions, showPlayerButton: true });
    expect(storageGet).toHaveBeenCalledTimes(2);
  });

  it('propagates read errors and allows another attempt', async () => {
    const error = new Error('Storage unavailable');
    storageGet.mockRejectedValueOnce(error);

    await expect(getOptions()).rejects.toBe(error);
    await expect(getOptions()).resolves.toEqual(defaultOptions);
  });
});

describe('setOptions', () => {
  it('writes only the supplied options', async () => {
    await setOptions({ showPlayerButton: false });

    expect(storageSet).toHaveBeenCalledExactlyOnceWith({ showPlayerButton: false });
  });

  it('propagates write errors', async () => {
    const error = new Error('Storage unavailable');
    storageSet.mockRejectedValueOnce(error);

    await expect(setOptions({ showPlayerButton: false })).rejects.toBe(error);
  });
});
