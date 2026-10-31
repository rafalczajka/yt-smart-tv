import { getOptions } from '~/options';
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
  browser.runtime.onInstalled.addListener(async () => {
    await browser.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
  });

  browser.runtime.onMessage.addListener(async (message, sender) => {
    const isIncognito = sender.tab?.incognito ?? false;
    const windowId = sender.tab?.windowId;

    switch (message) {
      case messages.OPEN_SMART_TV: {
        const options = await getOptions();
        await openYouTubeTv('', options, isIncognito, windowId);
        break;
      }

      case messages.OPEN_SMART_TV_WITH_URI: {
        const uri = getYouTubeRelativeUri(sender.tab?.url);
        const options = await getOptions();
        await openYouTubeTv(uri, options, isIncognito, windowId);
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
