<script lang="ts">
  import { onMount } from 'svelte';

  import { Card, Footer, Header, Section } from '~/components/ui';
  import { emptyOptions, getOptions, optionKeys, type Options, setOptions } from '~/options';

  let options = $state<Options>({ ...emptyOptions });
  let hydrated = $state(false);
  let previousOptions: Options = { ...emptyOptions };

  onMount(() => {
    (async () => {
      const stored = await getOptions();
      previousOptions = stored;
      Object.assign(options, stored);
      hydrated = true;
    })();
  });

  $effect(() => {
    if (!hydrated) return;

    const changes: Partial<Options> = {};

    for (const key of optionKeys) {
      if (options[key] !== previousOptions[key]) {
        changes[key] = options[key];
      }
    }

    if (Object.keys(changes).length === 0) return;

    previousOptions = { ...options };
    void setOptions(changes);
  });
</script>

<main>
  <Header subtitle="Settings" />

  <Section title="Launch controls">
    <Card
      title="Sidebar shortcut"
      description="Show a Smart TV shortcut in YouTube's sidebar."
      bind:checked={options.showGuideButton}
      disabled={!hydrated}
    />

    <Card
      title="Mini sidebar shortcut"
      description="Show a Smart TV shortcut in YouTube's collapsed sidebar."
      bind:checked={options.showMiniGuideButton}
      disabled={!hydrated}
    />

    <Card
      title="Player button"
      description="Show a Smart TV button next to the player's fullscreen control."
      bind:checked={options.showPlayerButton}
      disabled={!hydrated}
    />
  </Section>

  <Section title="Launch behavior">
    <Card
      title="Open in a new window"
      description="Open TV mode in a separate window instead of a new tab."
      bind:checked={options.openInNewWindow}
      disabled={!hydrated}
    />

    {#if options.openInNewWindow}
      <Card
        title="Open in full screen"
        description="Open the TV mode window in full-screen mode."
        bind:checked={options.openInFullscreen}
        disabled={!hydrated}
      />
    {:else}
      <Card
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
    gap: 28px;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    padding: 40px 24px 24px;

    @media (max-width: 480px) {
      padding: 28px 16px 20px;
    }
  }

  .hint {
    color: var(--ytstv-muted);
    font-size: 12px;
  }
</style>
