<script lang="ts">
  import ExtensionIcon from '~/components/icons/extension.svelte';
  import ExternalLinkIcon from '~/components/icons/external-link.svelte';
  import { Button, Footer, Header } from '~/components/ui';
  import { getOptions } from '~/options';
  import { openYouTube, openYouTubeTv } from '~/tv';

  import SettingsButton from './settings-button.svelte';

  const handleYouTubeClick = async () => {
    await openYouTube();
    window.close();
  };

  const handleYouTubeTvClick = async () => {
    const options = await getOptions();
    const currentWindow = await browser.windows.getCurrent();
    const incognito = currentWindow?.incognito ?? false;
    await openYouTubeTv('', options, incognito, currentWindow?.id);
    window.close();
  };
</script>

<main>
  <Header size="sm">
    <SettingsButton />
  </Header>

  <div class="actions">
    <Button variant="primary" onclick={handleYouTubeTvClick}>
      {#snippet iconBefore()}<ExtensionIcon />{/snippet}
      Open TV mode
    </Button>
    <Button variant="secondary" onclick={handleYouTubeClick}>
      Open YouTube
      {#snippet iconAfter()}<ExternalLinkIcon />{/snippet}
    </Button>
  </div>

  <Footer />
</main>

<style lang="scss">
  :global(body) {
    width: 340px;
  }

  main {
    padding: 16px;
    display: grid;
    gap: 18px;
  }

  .actions {
    display: grid;
    gap: 8px;
  }
</style>
