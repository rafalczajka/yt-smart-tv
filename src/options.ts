/**
 * Options that affect YouTube UI integration (content script behavior).
 */
export interface UiOptions {
  showGuideButton: boolean;
  showMiniGuideButton: boolean;
  showPlayerButton: boolean;
}

/**
 * Options that affect how the extension opens YouTube TV.
 */
export interface BehaviorOptions {
  openInNewWindow: boolean;
  openInFullscreen: boolean;
}

/**
 * All extension options stored in `browser.storage.sync`.
 */
export type Options = UiOptions & BehaviorOptions;

/**
 * Default options used when nothing is stored yet.
 */
export const defaultOptions: Options = {
  showGuideButton: true,
  showMiniGuideButton: true,
  showPlayerButton: true,
  openInNewWindow: true,
  openInFullscreen: true
};

/**
 * Options object with all features disabled.
 *
 * @remarks
 * Useful as an initial UI state before hydration.
 */
export const emptyOptions: Options = {
  showGuideButton: false,
  showMiniGuideButton: false,
  showPlayerButton: false,
  openInNewWindow: false,
  openInFullscreen: false
};

/**
 * Union of valid option keys.
 */
export type OptionKey = keyof Options;

/**
 * Keys that are read from / written to `browser.storage.sync`.
 */
export const optionKeys = Object.keys(defaultOptions) as OptionKey[];

/**
 * Type guard for {@link OptionKey}.
 *
 * @param value - Raw key value (e.g. from `storage.onChanged`).
 */
export function isOptionKey(value: string): value is OptionKey {
  return optionKeys.includes(value as OptionKey);
}

/**
 * Loads options from `browser.storage.sync` and merges them with {@link defaultOptions}.
 *
 * @returns Resolved options object.
 */
export async function getOptions(): Promise<Options> {
  const stored = await browser.storage.sync.get(optionKeys);
  return { ...defaultOptions, ...(stored as Partial<Options>) };
}

/**
 * Persists a subset of options into `browser.storage.sync`.
 *
 * @param options - Partial options to persist.
 */
export async function setOptions(options: Partial<Options>) {
  await browser.storage.sync.set(options);
}
