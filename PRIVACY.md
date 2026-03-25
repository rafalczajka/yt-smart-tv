# Privacy Policy

Last updated: 2026-03-25

## Overview

YouTube Smart TV is a browser extension that adds buttons to YouTube pages, opens YouTube TV mode, and lets users control how the extension behaves through local extension settings.

This extension's use of data complies with the Chrome Web Store User Data Policy, including the Limited Use requirements.

## Data the extension handles

The extension may handle the following data while providing its core functionality:

- YouTube page URLs, including the current video URL and timestamp, so it can open the matching YouTube TV page.
- Limited YouTube page content and DOM state, so it can inject the Smart TV buttons into the YouTube interface and detect when the TV exit screen is shown.
- User preferences stored in browser extension storage, such as whether buttons are enabled and whether TV mode opens in a new window or fullscreen.

## How the data is used

The extension uses this data only to provide its single purpose:

- add Smart TV launch controls to YouTube,
- open YouTube TV mode from standard YouTube pages,
- preserve the current video and playback timestamp when TV mode is opened using the player button,
- close the TV tab or window when the user exits TV mode,
- remember extension settings across browser sessions.

## Data sharing and transfer

- The extension does not send user data to the developer or to any third-party server.
- The extension does not sell, rent, or transfer user data to third parties.
- The extension does not use user data for advertising, profiling, analytics, or tracking.

## Data storage

- Extension settings are stored using the browser's extension storage sync area.
- Page URLs, timestamps, and page state are processed locally in the browser at runtime and are not stored by the developer.

## Permissions

The extension requests only the permissions needed for its core functionality:

- `storage` to save user preferences.
- `declarativeNetRequest` to set a Smart TV-compatible User-Agent for YouTube TV pages.
- Host access to `https://*.youtube.com/*` to add UI on YouTube pages and open YouTube TV mode.

## Remote code

The extension does not use or execute remote code.

## Contact

For questions or support, please use the GitHub repository:

https://github.com/rczajkadev/yt-smart-tv
