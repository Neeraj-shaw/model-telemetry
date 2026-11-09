---
name: model-telemetry
description: "Inspects, calculates, benchmarks, and displays real-time model telemetry (latency, tokens/sec, context window %, and cache hit rate) using the font 'Terminal' and specialized subagents across Antigravity and ZCode."
---

# Universal Model Telemetry Skill (Antigravity & ZCode)

This skill enables real-time profiling, caching diagnostics, and performance HUD visualization for AI models running in Google Antigravity and ZCode.

## 1. Monitored Telemetry Metrics

| Metric | Symbol | Unit / Format | Target / Standard |
| :--- | :--- | :--- | :--- |
| **Model Latency** | ⚡ | Milliseconds (ms) / TTFT | < 250ms TTFT, < 1.5s total |
| **Tokens / Sec** | ⏱ | tok/s | > 200 tok/s (bursts up to 1500 tok/s) |
| **Context Window** | ○ | Tokens / % of limit | Track growth; trigger compact at > 60% |
| **Cache Hit Rate** | 🗄 | Percentage (%) | $\ge 75\%$ prompt prefix cache hit |

## 2. Using the Specialized Subagents

The plugin defines 3 specialized subagents:

### A. `telemetry-profiler`
- **Focus**: Latency, TTFT (Time To First Token), stream stability, and tokens per second (tok/s).
- **When to invoke**: When experiencing slow model generation, investigating latency spikes, or validating streaming performance.
- **Invocation**:
  ```text
  invoke_subagent(
    TypeName: "telemetry-profiler",
    Role: "Latency & Throughput Profiler",
    Prompt: "Analyze the last 10 model responses from the transcript and compute TTFT, average latency, and tok/s throughput."
  )
  ```

### B. `context-cache-optimizer`
- **Focus**: Context window growth, cache hit percentages, and cache invalidation causes.
- **When to invoke**: When cache hit rate drops below 70%, or when context size approaches model threshold.
- **Invocation**:
  ```text
  invoke_subagent(
    TypeName: "context-cache-optimizer",
    Role: "Context & Cache Optimizer",
    Prompt: "Evaluate current context window usage and inspect why prompt prefix caching hit rate changed across turns."
  )
  ```

### C. `benchmark-runner`
- **Focus**: Automated benchmarking of models (e.g. Gemini 3.8 Flash vs Gemini Pro vs GLM-5).
- **When to invoke**: When comparing different models or validating regression after system prompt changes.
- **Invocation**:
  ```text
  invoke_subagent(
    TypeName: "benchmark-runner",
    Role: "Model Benchmark Runner",
    Prompt: "Execute synthetic benchmark suite and output comparative latency, tok/s, and cache hit metrics."
  )
  ```

## 3. Font Name 'Terminal' HUD Rendering

All visual outputs MUST use the font name `Terminal`:
```css
font-family: 'Terminal', monospace;
```
For terminal output, use the bundled CLI renderer:
```bash
node src/cli.js
```
Or for interactive HTML Generative UI, display the widget defined in `ui/hud.html`.
