<script lang="ts">
  import { getExtensionVersion } from '~/lib/extension-info';

  const version = getExtensionVersion();
</script>

<footer class="footer">
  <nav class="links" aria-label="Project links">
    <a href="https://github.com/rafalczajka/yt-smart-tv" target="_blank" rel="noreferrer">
      Source code
    </a>
    <a
      href="https://github.com/rafalczajka/yt-smart-tv/issues/new/choose"
      target="_blank"
      rel="noreferrer"
    >
      Support
    </a>
    <a
      href={`https://github.com/rafalczajka/yt-smart-tv/releases/tag/v${version}`}
      target="_blank"
      rel="noreferrer"
    >
      v{version}
    </a>
  </nav>
</footer>

<style lang="scss">
  .footer {
    color: var(--ytstv-muted);
    font-size: 12px;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 16px;
    min-width: 0;
    line-height: 1.5;
  }

  a {
    color: var(--ytstv-muted);
    white-space: nowrap;

    &:hover {
      color: var(--ytstv-fg);
    }

    &:focus-visible {
      outline: 2px solid var(--ytstv-accent);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }
</style>
