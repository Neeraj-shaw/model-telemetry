# Native In-App Telemetry Rule (DeepSeek Harness Style)

Telemetry is an automatic, native capability — NOT a command.
- NEVER require slash commands (like /telemetry) or terminal CLI commands.
- Automatically and natively attach the clean single-line status footer at the very bottom of EVERY assistant response turn, mirroring DeepSeek Harness native decode-phase trajectory telemetry.
- Strictly use the font name **`Terminal`** (`font-family: 'Terminal', monospace;`).
- Standard native in-app statusline format:
  `⏱ 1259 tok/s    🗄 Cache hit 77%    ○ 3%    ⚡ 142ms`
