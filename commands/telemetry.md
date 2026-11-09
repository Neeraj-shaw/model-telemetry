---
description: Display real-time model telemetry (latency, tok/s, context window, cache rate) in font 'Terminal'
---

# /telemetry

Executes real-time model telemetry inspection:
1. Calculates latency (ms), tokens per second (tok/s), context window percentage, and cache hit rate (%).
2. Invokes the `telemetry-profiler` subagent if anomaly detection is requested.
3. Renders the status HUD styled with font name 'Terminal'.
