<script lang="ts">
  import { onMount } from 'svelte';

  import { Card, Footer, Header, Section } from '~/components/ui';
  import { emptyOptions, getOptions, type Options, setOptions } from '~/options';

  const SAVE_DEBOUNCE_MS = 200;

  let options = $state<Options>({ ...emptyOptions });
  let hydrated = $state(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let pendingSave = false;
  let latestSnapshot: Options | null = null;

  onMount(() => {
    (async () => {
      const stored = await getOptions();
      Object.assign(options, stored);
      hydrated = true;
    })();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      if (pendingSave && latestSnapshot) {
        pendingSave = false;
        void setOptions(latestSnapshot);
      }
    };
  });

  $effect(() => {
    if (!hydrated) return;

    const snapshot: Options = { ...options };
    latestSnapshot = snapshot;
    pendingSave = true;

    // debounce
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      pendingSave = false;
      await setOptions(snapshot);
    }, SAVE_DEBOUNCE_MS);
  });
</script>

<main>
  <Header subtitle="Settings" />

  <Section title="Launch controls">
    <Card
      type="switch"
      title="Sidebar shortcut"
      description="Show a Smart TV shortcut in YouTube's sidebar."
      bind:checked={options.showGuideButton}
      disabled={!hydrated}
    />

    <Card
      type="switch"
      title="Mini sidebar shortcut"
      description="Show a Smart TV shortcut in YouTube's collapsed sidebar."
      bind:checked={options.showMiniGuideButton}
      disabled={!hydrated}
    />

    <Card
      type="switch"
      title="Player button"
      description="Show a Smart TV button next to the player's fullscreen control."
      bind:checked={options.showPlayerButton}
      disabled={!hydrated}
    />
  </Section>

  <Section title="Launch behavior">
    <Card
      type="switch"
      title="Open in a new window"
      description="Open TV mode in a separate window instead of a new tab."
      bind:checked={options.openInNewWindow}
      disabled={!hydrated}
    />

    {#if options.openInNewWindow}
      <Card
        type="switch"
        title="Open in full screen"
        description="Open the TV mode window in full-screen mode."
        bind:checked={options.openInFullscreen}
        disabled={!hydrated}
      />
    {:else}
      <Card
        type="switch"
        title="Open in full screen"
        description="Open the TV mode window in full-screen mode."
        checked={false}
        disabled
      >
        <p class="hint">Available only when "Open in a new window" is enabled.</p>
      </Card>
    {/if}
  </Section>

  <Footer />
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;

    @media (max-width: 680px) {
      padding: 40px 12px;
    }
  }

  .hint {
    color: var(--ytstv-muted);
    font-size: 12px;
  }
</style>
