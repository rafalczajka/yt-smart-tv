# YouTube Smart TV

## Store listing

### Product details

#### Summary from package
One-click launcher for the TV version of YouTube.

#### Description
YouTube Smart TV adds Smart TV controls directly to YouTube, making it easy to switch from the standard YouTube interface to YouTube TV.

Main features:
- Adds a Smart TV entry to the YouTube sidebar.
- Adds a Smart TV button next to the fullscreen button in the player.
- Opens YouTube TV from the current YouTube page and, when using the player button, keeps the current video and playback timestamp.
- Can open TV mode in a new window and optionally in fullscreen.
- Includes an options page to control which buttons are visible.
- Supports exiting TV mode with Esc, with a 3-second hold fallback.

Typical use case:
Open a video on regular YouTube, switch to YouTube TV, and then pair your phone with a TV code to use it as a remote.

#### Category
Entertainment

#### Language
English

### Graphic assets

#### Store icon
![YouTube Smart TV](/assets/store/store-icon.png)

#### Global promo video
none

#### Screenshots
![Screenshot 1](/assets/store/screenshot-1-callout.png)
![Screenshot 2](/assets/store/screenshot-2.png)
![Screenshot 3](/assets/store/screenshot-3.png)
![Screenshot 4](/assets/store/screenshot-4-callout.png)
![Screenshot 5](/assets/store/screenshot-5.png)

#### Small promo tile
none

#### Marquee promo tile
none

### Additional fields

#### Official URL
none

#### Homepage URL
https://github.com/rafalczajka/yt-smart-tv

#### Support URL
https://github.com/rafalczajka/yt-smart-tv/issues/new/choose

## Privacy

### Single purpose

#### Single purpose description
Add Smart TV controls directly to YouTube pages and open YouTube TV from the current page, including support for the current video and playback timestamp.

### Permission justification

#### declarativeNetRequest justification
Sets a Smart TV-compatible User-Agent only for main-frame requests to youtube.com/tv so YouTube TV opens and works correctly in the browser.

#### storage justification
Stores extension preferences, such as which Smart TV buttons are enabled and whether TV mode opens in a new window or in fullscreen.

#### Host permission justification
Required to add Smart TV controls on YouTube pages, read the current YouTube page URL and playback state, detect TV exit screens, and open or close YouTube TV.

## Test instructions
No extension credentials required. YouTube may require sign-in to play videos.

1. Open a YouTube video page.
2. Verify the Smart TV sidebar entry and player button appear.
3. Click the player button and verify YouTube TV opens with the current video and timestamp.
4. Verify TV mode can be closed with Esc; if needed, press it more than once or hold it for 3 seconds.
5. Open the options page and verify settings.
