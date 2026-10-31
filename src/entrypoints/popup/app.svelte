<script lang="ts">
  import { Card, Footer, Header, Section } from '~/components/ui';
  import { getOptions } from '~/options';
  import { openOptions, openYouTube, openYouTubeTv } from '~/tv';

  const handleYouTubeClick = async () => {
    await openYouTube();
    window.close();
  };

  const handleYouTubeTvClick = async () => {
    const options = await getOptions();
    const currentWindow = await browser.windows.getCurrent();
    const incognito = currentWindow?.incognito ?? false;
    await openYouTubeTv('', options, incognito);
    window.close();
  };

  const handleOptionsClick = async () => {
    await openOptions();
    window.close();
  };
</script>

<main>
  <Header size="sm" />

  <Section>
    <Card type="button" title="Open YouTube" onclick={handleYouTubeClick} icon="external-link" />

    <Card
      type="button"
      title="Open YouTube TV"
      onclick={handleYouTubeTvClick}
      icon="external-link"
    />

    <Card
      type="button"
      title="Open extension settings"
      onclick={handleOptionsClick}
      icon="settings"
    />
  </Section>

  <Footer />
</main>

<style lang="scss">
  main {
    min-width: 340px;
    padding: 18px 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
