<script lang="ts">
  import SettingsIcon from '~/components/icons/settings.svelte';
  import { openOptions } from '~/tv';

  const handleClick = async () => {
    await openOptions();
    window.close();
  };
</script>

<button
  type="button"
  class="settings-button"
  onclick={handleClick}
  aria-label="Open extension settings"
  title="Open extension settings"
>
  <span class="icon" aria-hidden="true">
    <SettingsIcon width="18" height="18" />
  </span>
</button>

<style lang="scss">
  .settings-button {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    padding: 0;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--ytstv-muted);
    cursor: pointer;
    transition: color var(--ytstv-transition-duration) ease-in-out;

    &:focus-visible {
      outline: 2px solid var(--ytstv-accent);
      outline-offset: 3px;
    }

    &:hover,
    &:focus-visible {
      color: var(--ytstv-fg);

      .icon {
        transform: rotate(90deg);
      }
    }
  }

  .icon {
    display: flex;
    transition: transform calc(var(--ytstv-transition-duration) * 2) ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .settings-button:hover .icon,
    .settings-button:focus-visible .icon {
      transform: none;
    }
  }
</style>
