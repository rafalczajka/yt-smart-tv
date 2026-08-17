import { LazyOptions } from '~/options';
import {
  getUserAgentUpdateRuleOptions,
  getYouTubeRelativeUri,
  messages,
  openYouTubeTv
} from '~/tv';

/**
 * Background entrypoint.
 *
 * @remarks
 * - Installs a Declarative Net Request rule to set a custom User-Agent for `youtube.com/tv`.
 * - Handles runtime messages from content scripts (open/close Smart TV window).
 */
export default defineBackground(() => {
  const lazyOptions = new LazyOptions();

  browser.runtime.onInstalled.addListener(async () => {
    await browser.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
  });

  browser.runtime.onMessage.addListener(async (message, sender) => {
    const isIncognito = sender.tab?.incognito ?? false;

    switch (message) {
      case messages.OPEN_SMART_TV: {
        const options = await lazyOptions.get();
        await openYouTubeTv('', options, isIncognito);
        break;
      }

      case messages.OPEN_SMART_TV_WITH_URI: {
        const uri = getYouTubeRelativeUri(sender.tab?.url);
        const options = await lazyOptions.get();
        await openYouTubeTv(uri, options, isIncognito);
        break;
      }

      case messages.CLOSE_SMART_TV: {
        const tabId = sender.tab?.id;
        if (tabId !== undefined) await browser.tabs.remove(tabId);
        break;
      }
    }
  });
});
