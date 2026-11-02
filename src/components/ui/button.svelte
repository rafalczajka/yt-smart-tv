<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary';
    iconBefore?: Snippet;
    iconAfter?: Snippet;
  }

  let {
    variant = 'secondary',
    type = 'button',
    children,
    iconBefore,
    iconAfter,
    class: className,
    ...attributes
  }: Props = $props();
</script>

<button {type} {...attributes} class={['button', variant, className]}>
  {#if iconBefore}
    <span class="icon" aria-hidden="true">{@render iconBefore()}</span>
  {/if}
  <span class="label">{@render children?.()}</span>
  {#if iconAfter}
    <span class="icon" aria-hidden="true">{@render iconAfter()}</span>
  {/if}
</button>

<style lang="scss">
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: 0;
    width: 100%;
    min-height: 44px;
    padding: 10px 14px;
    border: 1px solid var(--ytstv-border);
    border-radius: 6px;
    font-weight: 600;
    line-height: 1.4;
    cursor: pointer;
    transition:
      background-color var(--ytstv-transition-duration) ease-in-out,
      border-color var(--ytstv-transition-duration) ease-in-out;

    &:focus-visible {
      outline: 2px solid var(--ytstv-accent);
      outline-offset: 3px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .primary {
    min-height: 48px;
    border-color: var(--ytstv-action);
    background: var(--ytstv-action);
    color: #fff;

    &:not(:disabled):hover {
      border-color: var(--ytstv-action-hover);
      background: var(--ytstv-action-hover);
    }
  }

  .secondary {
    background: var(--ytstv-surface);

    &:not(:disabled):hover {
      background: var(--ytstv-surface-hover);
    }
  }

  .icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;

    :global(svg) {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .label {
    min-width: 0;
    overflow-wrap: anywhere;
  }
</style>
