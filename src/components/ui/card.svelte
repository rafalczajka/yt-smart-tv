<script lang="ts">
  import { type Snippet } from 'svelte';

  import Switch from './switch.svelte';

  interface Props {
    title: string;
    description?: string;
    disabled?: boolean;
    children?: Snippet;
    checked?: boolean;
  }

  let {
    title,
    description,
    children,
    disabled = false,
    checked = $bindable(false)
  }: Props = $props();
</script>

<label class="card" class:disabled>
  <div class="content">
    <div class="title">{title}</div>
    {#if description}
      <div class="description">{description}</div>
    {/if}
    {@render children?.()}
  </div>
  <div class="actions">
    <Switch bind:checked {disabled} />
  </div>
</label>

<style lang="scss">
  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    min-width: 0;
    min-height: 76px;
    padding: 12px 16px;
    border: 1px solid var(--ytstv-border);
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    background: var(--ytstv-surface);
    transition: background-color var(--ytstv-transition-duration) ease-in-out;

    &:not(.disabled):hover {
      background: var(--ytstv-surface-hover);
    }

    &.disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .content {
      display: grid;
      gap: 4px;
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .title {
      font-weight: 600;
    }

    .description {
      color: var(--ytstv-muted);
      font-size: 12px;
    }

    .actions {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
  }
</style>
