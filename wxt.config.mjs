import { defineConfig } from 'wxt';

const geckoSettings = {
  id: 'yt-smart-tv@rafalczajka.github.io',
  data_collection_permissions: {
    required: ['none']
  }
};

export default defineConfig({
  srcDir: 'src',
  outDir: 'dist',
  modules: ['@wxt-dev/module-svelte'],
  imports: {
    dirs: []
  },
  manifest: ({ browser }) => ({
    name: 'YouTube Smart TV',
    description: 'Open YouTube in TV mode with one click.',
    homepage_url: 'https://github.com/rafalczajka/yt-smart-tv',
    permissions: ['declarativeNetRequest', 'storage'],
    host_permissions: ['https://*.youtube.com/*'],
    browser_specific_settings: browser === 'firefox' ? { gecko: geckoSettings } : undefined
  })
});
