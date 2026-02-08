# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Handle TV exit on the `WELCOME` page.

## [1.0.1] - 2026-01-26

### Added

- Exit TV mode with `Esc` on the account selector screen.

### Fixed

- Preserve incognito context when launching TV mode from the popup.
- Persist options changes even if the options page is closed quickly.
- Correct mini guide button hover behavior.

### Changed

- Documentation updates.
- Dependency updates.

## [1.0.0] - 2026-01-01

### Added

- YouTube UI integration (sidebar + player button) to open YouTube in TV mode.
- Popup with quick actions (open YouTube, open TV mode, open extension options).
- Options page to configure which buttons are shown and how TV mode opens (new window/tab, fullscreen).
- Firefox build support alongside Chromium builds.
- Unit tests with Vitest.
- GitHub Actions CI workflow.
