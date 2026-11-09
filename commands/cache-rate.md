---
description: Inspect and optimize prompt prefix cache hit rate and context window allocation
---

# /cache-rate

Evaluates prompt caching efficiency:
1. Calculates: `(cache_read_tokens / (cache_read_tokens + uncached_input_tokens)) * 100%`.
2. Inspects prefix alignment across recent turns.
3. Invokes the `context-cache-optimizer` subagent for compaction or ordering advice.
4. Outputs breakdown in 'Terminal' font.
