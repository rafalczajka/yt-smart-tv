/**
 * Message identifiers exchanged between the background script and content scripts.
 *
 * @remarks
 * Keep values stable to preserve backward compatibility across extension updates.
 */
const messages = {
  OPEN_SMART_TV: 'open-smart-tv',
  OPEN_SMART_TV_WITH_URI: 'open-smart-tv-with-uri',
  CLOSE_SMART_TV: 'close-smart-tv'
} as const;

/**
 * Union of valid message string values.
 */
export type Message = (typeof messages)[keyof typeof messages];

export default messages;
