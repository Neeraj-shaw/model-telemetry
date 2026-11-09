# Universal Telemetry Guidelines (Antigravity & ZCode)

This rule applies universally across Google Antigravity and ZCode environments when evaluating model performance, latency, tokens per second, context window usage, and cache hit rates.

## Core Telemetry Metrics

1. **Model Latency**:
   - Time To First Token (TTFT, measured in ms)
   - End-to-end turnaround latency (duration from prompt transmission to response completion)
   - Rolling P50/P95 latency percentiles

2. **Tokens Per Second (tok/s)**:
   - Output generation throughput calculated as:
     $$\text{Throughput} = \frac{\text{Output Tokens}}{\text{Generation Time (seconds)}}$$
   - Displays real-time burst rate (e.g. `1259 tok/s`)

3. **Context Window Usage**:
   - Current tokens active in context vs maximum context capacity (e.g. 1,048,576 tokens for Gemini 3.8 Flash, 128k for GLM-4/5)
   - Percentage utilization:
     $$\text{Context \%} = \frac{\text{Input Tokens} + \text{Output Tokens}}{\text{Max Context Window}} \times 100\%$$
   - Visualized with radial gauge / circle meter (`○ 3%`)

4. **Cache Rate (Cache Hit %)**:
   - Evaluates prompt prefix caching efficiency:
     $$\text{Cache Hit Rate} = \frac{\text{Cache Read Tokens}}{\text{Cache Read Tokens} + \text{Uncached Input Tokens}} \times 100\%$$
   - Target benchmark is $\ge 75\%$ for multi-turn conversations.

## Visual Styling & Font Rule

- **FONT NAME**: All visual telemetry HUD widgets, stats bars, badges, and terminal readouts MUST specify and render using the font name **`Terminal`** (`font-family: 'Terminal', monospace;`).
- Use classic phosphor terminal aesthetics (green `#00ff66`, cyan `#00e5ff`, amber `#ffb000`, dark background `#0d1117`).

## Specialized Subagents

When delegating telemetry analysis, utilize the three specialized subagents:
1. `telemetry-profiler`: Profiling model latency, TTFT, and generation speed (tok/s).
2. `context-cache-optimizer`: Analyzing context window saturation, prefix caching stability, and cache hit rates.
3. `benchmark-runner`: Running synthetic and workload benchmarks across models.
