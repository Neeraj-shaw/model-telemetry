# Universal Telemetry Plugin for Antigravity & ZCode

A universal plugin that monitors and displays AI model performance telemetry:
- **⚡ Model Latency**: Time-To-First-Token (TTFT) and full turnaround response time (ms).
- **⏱ Tokens Per Second (tok/s)**: Generation speed and burst throughput.
- **○ Context Window Usage**: Active tokens vs model capacity and percentage utilization gauge.
- **🗄 Cache Rate**: Prompt prefix cache hit rate (`cache_read / (cache_read + uncached_input)`).
- **📟 Visual Presentation**: Fully styled using the classic **Terminal** font (`font-family: 'Terminal', monospace`).
- **🤖 Specialized Subagents**: 3 autonomous subagents for profiling, caching optimization, and automated benchmarking.

---

## 1. Universal Compatibility Architecture

This plugin adheres simultaneously to the **Google Antigravity** plugin specification and the **ZCode** extension specification:

```text
zcode-antigravity-telemetry/
├── plugin.json                       # Antigravity root plugin manifest
├── .zcode-plugin/
│   └── plugin.json                   # ZCode plugin manifest
├── .antigravity-plugin/
│   └── plugin.json                   # Antigravity alias manifest
├── mcp_config.json                   # Universal MCP server configuration
├── hooks.json                        # Antigravity root lifecycle hooks
├── hooks/
│   ├── hooks.json                    # ZCode lifecycle hooks
│   └── on-response.js                # Post-invocation telemetry calculator
├── rules/
│   └── AGENTS.md                     # Universal agent rules & font constraints
├── skills/
│   └── model-telemetry/
│       ├── SKILL.md                  # Telemetry workflow skill
│       └── scripts/
│           ├── parse-transcript.js   # Live transcript telemetry extractor
│           └── hud.js                # ASCII Terminal HUD printer
├── commands/                         # ZCode slash commands
│   ├── telemetry.md                  # /telemetry
│   ├── cache-rate.md                 # /cache-rate
│   └── benchmark.md                  # /benchmark
├── agents/                           # ZCode subagents
│   ├── telemetry-profiler.md
│   ├── context-cache-optimizer.md
│   └── benchmark-runner.md
├── subagents/                        # Antigravity subagents
│   ├── telemetry-profiler.json
│   ├── context-cache-optimizer.json
│   └── benchmark-runner.json
├── src/
│   ├── telemetry-engine.js           # Core analytics & transcript parser
│   ├── hud-renderer.js               # Terminal font ASCII & HTML renderer
│   ├── mcp-server.js                 # Stdio MCP Server exposing telemetry tools
│   └── cli.js                        # CLI runner
└── ui/
    ├── hud.html                      # Generative UI widget in Terminal font
    └── hud.css                       # Retro phosphor green & cyan styling
```

---

## 2. Core Metrics & Mathematical Formulations

### 1. Model Latency (ms)
- **Time To First Token (TTFT)**: Duration between sending prompt and receiving the first stream byte.
- **Turnaround Latency**: Total elapsed time from dispatch to completion:
  $$\Delta t = t_{\text{completed}} - t_{\text{dispatched}}$$

### 2. Output Tokens Per Second (tok/s)
- Measures model token generation speed:
  $$\text{Throughput} = \frac{\text{Output Tokens}}{\text{Generation Duration (seconds)}}$$
- Displays peak streaming burst rates (e.g. `1259 tok/s` as shown on Gemini 3.8 Flash).

### 3. Context Window Usage
- Ratio of active tokens to maximum context ceiling (e.g. 1,048,576 tokens for Gemini Flash / Pro, 131,072 for GLM-5):
  $$\text{Context Usage \%} = \frac{\text{Prompt Tokens} + \text{Output Tokens}}{\text{Context Limit}} \times 100\%$$

### 4. Cache Hit Rate (%)
- Reflects model prefix cache reuse efficiency across multi-turn interactions:
  $$\text{Cache Hit Rate} = \frac{\text{Cache Read Tokens}}{\text{Cache Read Tokens} + \text{Uncached Input Tokens}} \times 100\%$$

---

## 3. Font Requirement: 'Terminal'

As required, all HUD visualizations, terminal ASCII borders, and Generative UI widgets enforce the **Terminal** font:
```css
font-family: 'Terminal', monospace, 'Courier New';
```
When viewed in the terminal or webview, it provides a crisp, phosphor CRT retro-modern developer aesthetic with custom ASCII progress meters and pulse status indicators.

---

## 4. Specialized Subagents

| Subagent | Role | Capabilities |
| :--- | :--- | :--- |
| **`telemetry-profiler`** | Latency & Speed Profiler | Analyzes TTFT, end-to-end response duration, tokens/sec throughput, and network jitter spikes. |
| **`context-cache-optimizer`** | Context & Cache Strategist | Evaluates prompt prefix alignment, identifies cache invalidation culprits, and forecasts context saturation. |
| **`benchmark-runner`** | Performance Auditor | Runs standardized prompt suites across models and generates comparative benchmark scorecards. |

---

## 5. Installation & Setup

### For Google Antigravity
1. **Global Installation**:
   Copy or link the plugin directory to `~/.gemini/config/plugins/`:
   ```bash
   # Windows PowerShell
   Copy-Item -Recurse "C:\Users\Hp\.gemini\antigravity\scratch\zcode-antigravity-telemetry" "$HOME\.gemini\config\plugins\"
   ```
2. **Workspace-Level Installation**:
   Place inside your project's `.agents/plugins/` directory:
   ```bash
   mkdir -p .agents/plugins
   cp -r zcode-antigravity-telemetry .agents/plugins/
   ```

### For ZCode
1. Place inside your ZCode plugins path or `.zcode/plugins/`:
   ```bash
   cp -r zcode-antigravity-telemetry ~/.zcode/plugins/
   ```
2. The `.zcode-plugin/plugin.json` is auto-discovered on next launch. Slash commands `/telemetry`, `/cache-rate`, and `/benchmark` are enabled automatically.

---

## 6. Standalone CLI & MCP Usage

### Quick CLI Diagnostics
```bash
# Print Terminal HUD
node src/cli.js

# Print compact status bar replica
node src/cli.js --status-bar

# Output JSON telemetry
node src/cli.js --json
```

### Stdio MCP Server
Exposed tools:
- `get_telemetry_metrics`: Returns current live metrics object.
- `render_terminal_hud`: Returns formatted Terminal HUD (ASCII, status bar, or HTML).
- `benchmark_model`: Executes benchmark evaluation.
- `analyze_cache_efficiency`: Evaluates prefix cache health and recommendations.
