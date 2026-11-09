# Universal Model Telemetry for Antigravity & ZCode

A universal plugin that delivers **native, automatic in-app telemetry** for AI models across **Google Antigravity** and **ZCode**, mirroring the seamless decode-phase trajectory metrics of **DeepSeek Harness (DSH)**.

```text
⏱ 1259 tok/s    🗄 Cache hit 77%    ○ 3%    ⚡ 142ms
```

---

## Highlights

- **⚡ Native In-App Telemetry (No Commands)**: Does not require slash commands (like `/telemetry`) or external terminal executions. Metrics are automatically calculated and attached to the bottom of each assistant message turn in your IDE/desktop chat.
- **📟 Strict Font Requirement (`Terminal`)**: Visual status indicators and text telemetry strictly render using the font name **`Terminal`** (`font-family: 'Terminal', monospace;`).
- **📊 4 Core Performance Metrics**:
  1. **Latency (`⚡`)**: Time-To-First-Token (TTFT) and end-to-end turnaround duration in milliseconds.
  2. **Tokens Per Second (`⏱`)**: Real-time generation throughput (`tok/s`).
  3. **Context Window (`○`)**: Active token count vs maximum window limit (e.g. 1M for Gemini Flash, 128k for GLM-5) with percentage gauge.
  4. **Cache Hit Rate (`🗄`)**: Prompt prefix cache reuse efficiency (`(cache_read / (cache_read + uncached_input)) * 100%`).
- **🤖 3 Specialized Subagents**: Autonomous worker agents for latency profiling, context & cache optimization, and multi-model benchmarking.
- **🌐 Universal Dual Support**: Fully compatible with both Google Antigravity and ZCode plugin ecosystems.

---

## Status Bar Visual Specification

All telemetry displays conform strictly to the **`Terminal`** font family:

```text
╔══════════════════════════════════════════════════════════════════╗
║  [FONT: TERMINAL]  ANTIGRAVITY & ZCODE UNIVERSAL TELEMETRY HUD  ║
╠══════════════════════════════════════════════════════════════════╣
║  Active Model   : Gemini 3.8 Flash (High)                       ║
║  Renderer Font  : Terminal (Monospace)                          ║
╟──────────────────────────────────────────────────────────────────╢
║  ⏱  THROUGHPUT  : 1259 tok/s (Peak Burst: 1449 tok/s)           ║
║  ⚡  LATENCY     : 142ms total  |  TTFT: 65ms                    ║
║  🗄  CACHE RATE  : Cache hit 77% [██████████████████░░░░░░]      ║
║  ○  CONTEXT     : 3.0% (31,450 / 1,048,576 tokens)              ║
║                    [█░░░░░░░░░░░░░░░░░░░░░░░]                 ║
╟──────────────────────────────────────────────────────────────────╢
║  SESSION AVERAGES (DeepSeek Harness Trajectory Timing):          ║
║  • Sustained Cache Rate: 93% (Current Turn: 97.07%)             ║
║  • Context Saturation  : 8.1% (84,880 / 1,048,576 tokens)        ║
║  • Streaming Velocity  : 250 - 1449 tok/s                        ║
╚══════════════════════════════════════════════════════════════════╝
```

### In-App Minimalist Statusline
```text
⏱ 1259 tok/s    🗄 Cache hit 77%    ○ 3%    ⚡ 142ms
```

---

## Core Mathematical Formulations

### 1. Generation Speed (tok/s)
$$\text{Throughput} = \frac{\text{Output Tokens}}{\Delta t_{\text{generation}} \text{ (seconds)}}$$

### 2. Cache Hit Rate (%)
$$\text{Cache Hit Rate} = \frac{\text{Cache Read Tokens}}{\text{Cache Read Tokens} + \text{Uncached Input Tokens}} \times 100\%$$

### 3. Context Window Utilization (%)
$$\text{Context Usage} = \frac{\text{Active Cumulative Tokens}}{\text{Maximum Model Context Capacity}} \times 100\%$$

### 4. Turnaround Latency (ms)
$$\text{Latency} = t_{\text{response\_completed}} - t_{\text{prompt\_dispatched}}$$

---

## Specialized Subagents

| Subagent | Role | Focus |
| :--- | :--- | :--- |
| **`telemetry-profiler`** | Latency & Speed Profiler | Tracks Time-To-First-Token (TTFT), response turnaround time, stream throughput, and network jitter. |
| **`context-cache-optimizer`** | Context & Cache Strategist | Evaluates prompt prefix alignment, identifies cache invalidation culprits, and prevents context saturation. |
| **`benchmark-runner`** | Performance Auditor | Runs automated benchmark prompt suites across Gemini, GLM, and Claude model families. |

---

## Universal Repository Structure

```text
zcode-antigravity-telemetry/
├── plugin.json                       # Antigravity root plugin manifest
├── .zcode-plugin/
│   └── plugin.json                   # ZCode plugin manifest
├── .antigravity-plugin/
│   └── plugin.json                   # Antigravity alias manifest
├── mcp_config.json                   # Universal Model Context Protocol config
├── hooks.json                        # Antigravity lifecycle hooks
├── hooks/
│   ├── hooks.json                    # ZCode lifecycle hooks
│   └── on-response.js                # Post-invocation telemetry hook
├── rules/
│   └── AGENTS.md                     # Native In-App Telemetry & Font Terminal rules
├── skills/
│   └── model-telemetry/
│       ├── SKILL.md                  # Telemetry workflow & runbook
│       └── scripts/
│           ├── parse-transcript.js   # Live session transcript extractor
│           └── hud.js                # Terminal HUD formatter
├── agents/                           # ZCode subagent markdown specs
│   ├── telemetry-profiler.md
│   ├── context-cache-optimizer.md
│   └── benchmark-runner.md
├── subagents/                        # Antigravity subagent JSON configurations
│   ├── telemetry-profiler.json
│   ├── context-cache-optimizer.json
│   └── benchmark-runner.json
├── src/
│   ├── telemetry-engine.js           # Core analytics & calculation engine
│   ├── hud-renderer.js               # Terminal font ASCII & HTML renderer
│   ├── mcp-server.js                 # Stdio MCP Server
│   └── cli.js                        # CLI runner
└── ui/
    ├── simple-bottom-bar.html        # Clean minimal in-app status footer
    ├── hud.html                      # Generative UI widget
    └── hud.css                       # Phosphor CRT styling in font Terminal
```

---

## Installation & Deployment

### 1. Google Antigravity
The plugin is installed globally into:
```bash
~/.gemini/config/plugins/zcode-antigravity-telemetry
```
Validated with the Antigravity CLI (`agy`):
```bash
agy plugin list
```

### 2. ZCode
The plugin is installed directly into your ZCode plugin directory:
```bash
~/.zcode/plugin-workspace/zcode-antigravity-telemetry
```
And registered in `~/.zcode/plugin-workspace/marketplace.json` and `~/.zcode/cli/plugins/installed_plugins.json`.

---

## License

Apache-2.0
