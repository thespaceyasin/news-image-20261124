# World News Broadsheet — Tuesday, 24 November 2026

[![Bounty](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![Rank](https://make.fun/badge/news-image-20261124/thespaceyasin/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![Reward](https://make.fun/badge/news-image-20261124/thespaceyasin/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

Single-image archival broadsheet summarizing **36 verified world news stories** from **Tuesday, 24 November 2026** across 9 regions and 14 categories, designed for crisp legibility at both `1024×1024` full resolution and `300×300` preview scale.

Built for the `news-image-20261124` bounty on [make.fun](https://make.fun/?ref=4dhdkr5y&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124).

## Structure

- `build-poster.mjs` — Generates the `1024×1024` RGB PNG (`entry.png`) via headless Chromium from deterministic HTML + inline custom SVG illustrations.
- `main.ts` — Deterministic Node 22 entrypoint (`node --experimental-strip-types main.ts`) that copies and validates `entry.png` into `$MAKEFUN_OUTPUT_DIR/entry.png`.
- `entry.png` — Final `1024×1024` RGB broadsheet artifact (`<= 1 MiB`).
