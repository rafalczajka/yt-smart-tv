<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    title?: string;
    children?: Snippet;
  }

  let { title, children }: Props = $props();
</script>

<section class="section">
  {#if title}
    <h2 class="title">{title}</h2>
  {/if}
  <div class="grid">
    {@render children?.()}
  </div>
</section>

<style lang="scss">
  .section {
    display: grid;
    gap: 12px;
  }

  .title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .grid {
    display: grid;
    gap: 8px;
  }
</style>
