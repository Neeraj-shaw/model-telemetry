# Universal Antigravity & ZCode In-App Telemetry Rule

Telemetry displays must appear **EXCLUSIVELY inside the Antigravity and ZCode application UIs**.
- Never output terminal CLI commands, shell scripts, or instructions for external terminals.
- Telemetry must render directly within the Antigravity and ZCode in-app chat interfaces via embedded UI components (`<agent-embed>`) and clean status footers.
- All visual status bars must strictly use the font name **`Terminal`** (`font-family: 'Terminal', monospace;`).
- Clean minimalist in-app format:
  `⏱ 1259 tok/s    🗄 Cache hit 77%    ○ 3%    ⚡ 142ms`
