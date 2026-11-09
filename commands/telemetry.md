---
description: Render in-app model telemetry footer (latency, tok/s, context window, cache rate) in font 'Terminal'
---

# /telemetry

Renders the clean, single-line telemetry status footer directly inside the ZCode in-app chat interface:
- Displays latency (ms), tokens per second (tok/s), context window %, and cache hit rate (%).
- Rendered exclusively within the ZCode UI using the font name **`Terminal`**.
- Format:
  `⏱ 1259 tok/s    🗄 Cache hit 77%    ○ 3%    ⚡ 142ms`
