import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  outDir: 'dist',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    name: 'YouTube Smart TV',
    description: 'Open YouTube in TV mode with one click.',
    version: '1.0.6',
    homepage_url: 'https://github.com/rafalczajka/yt-smart-tv',
    permissions: ['declarativeNetRequest', 'storage'],
    host_permissions: ['https://*.youtube.com/*']
  }
});
