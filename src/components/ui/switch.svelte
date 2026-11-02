<script lang="ts">
  interface Props {
    checked?: boolean;
    disabled?: boolean;
  }

  let { checked = $bindable(false), disabled = false }: Props = $props();
</script>

<span class="switch">
  <input type="checkbox" bind:checked {disabled} />
  <span class="track" aria-hidden="true">
    <span class="thumb"></span>
  </span>
</span>

<style lang="scss">
  .switch {
    display: inline-flex;
    align-items: center;
    cursor: inherit;
    user-select: none;

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;

      &:checked + .track {
        background: var(--ytstv-accent);

        .thumb {
          transform: translateX(16px);
        }
      }

      &:focus-visible + .track {
        outline: 2px solid var(--ytstv-accent);
        outline-offset: 2px;
      }

      &:disabled + .track {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .track {
      width: 38px;
      height: 22px;
      border-radius: 999px;
      background: #45454c;
      border: 1px solid transparent;
      position: relative;
      transition: background-color var(--ytstv-transition-duration) ease-in-out;

      .thumb {
        width: 16px;
        height: 16px;
        border-radius: 999px;
        background: #fff;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: transform var(--ytstv-transition-duration) ease-in-out;
      }
    }
  }
</style>
