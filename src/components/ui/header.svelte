<script lang="ts">
  import type { Snippet } from 'svelte';

  import ExtensionIcon from '~/components/icons/extension.svelte';
  import { getExtensionName } from '~/lib/extension-info';

  interface Props {
    title?: string;
    subtitle?: string;
    size?: 'md' | 'sm';
    children?: Snippet;
  }

  let { title = getExtensionName(), subtitle, size = 'md', children }: Props = $props();
</script>

<header class="header" class:sm={size === 'sm'}>
  <div class="identity">
    <span class="logo" aria-hidden="true">
      <ExtensionIcon width="1.25em" height="1em" color="#f04452" />
    </span>
    <h1 class="title">{title}</h1>
  </div>
  {#if subtitle}
    <p class="subtitle">{subtitle}</p>
  {/if}
  {#if children}
    <div class="actions">{@render children()}</div>
  {/if}
</header>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;

    &.sm {
      flex-direction: row;
      justify-content: space-between;
      gap: 12px;
      text-align: left;

      .identity {
        font-size: 17px;
      }
    }
  }

  .identity {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    font-size: 22px;
  }

  .logo,
  .actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }

  .subtitle {
    font-size: 13px;
    color: var(--ytstv-muted);
  }

  .title {
    min-width: 0;
    font-size: inherit;
    line-height: 1.35;
    font-weight: 600;
    overflow-wrap: anywhere;
  }
</style>
