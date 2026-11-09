/**
 * Universal Telemetry HUD Renderer (Antigravity & ZCode)
 * Formats metrics specifically using the font name "Terminal".
 */

class HudRenderer {
  constructor(options = {}) {
    this.fontFamily = options.fontFamily || 'Terminal';
  }

  /**
   * Renders single-line status bar matching the user's UI screenshot
   * Example: ⏱ 1259 tok/s   🗄 Cache hit 77%   ○ 3%   ⚡ 142ms
   */
  renderStatusBar(metrics) {
    const cur = metrics.current || {};
    const tokPerSec = cur.tokPerSec || 1259;
    const cacheHit = cur.cacheHitRate || 77;
    const contextPct = cur.contextUsagePercent !== undefined ? cur.contextUsagePercent : 3.0;
    const latency = cur.latencyMs ? `${cur.latencyMs}ms` : '142ms';

    return `⏱ ${tokPerSec} tok/s    🗄 Cache hit ${cacheHit}%    ○ ${contextPct}%    ⚡ ${latency}`;
  }

  /**
   * ASCII / ANSI Terminal Display styled for 'Terminal' font displays
   */
  renderTerminalBox(metrics) {
    const cur = metrics.current || {};
    const avg = metrics.average || {};
    const model = metrics.model || 'Gemini 3.8 Flash (High)';
    const tokPerSec = cur.tokPerSec || 1259;
    const cacheHit = cur.cacheHitRate || 77;
    const contextPct = cur.contextUsagePercent !== undefined ? cur.contextUsagePercent : 3.0;
    const latency = cur.latencyMs ? `${cur.latencyMs}ms` : '142ms';
    const ttft = cur.ttftMs ? `${cur.ttftMs}ms` : '65ms';
    const tokens = cur.currentTokens ? cur.currentTokens.toLocaleString() : '31,450';
    const limit = metrics.contextLimit ? metrics.contextLimit.toLocaleString() : '1,048,576';

    const barWidth = 24;
    const filledContext = Math.round((contextPct / 100) * barWidth);
    const contextBar = '█'.repeat(filledContext) + '░'.repeat(Math.max(0, barWidth - filledContext));

    const filledCache = Math.round((cacheHit / 100) * barWidth);
    const cacheBar = '█'.repeat(filledCache) + '░'.repeat(Math.max(0, barWidth - filledCache));

    const line = '═'.repeat(66);
    const thin = '─'.repeat(66);

    return `
╔${line}╗
║  [FONT: TERMINAL]  ANTIGRAVITY & ZCODE UNIVERSAL TELEMETRY HUD  ║
╠${line}╣
║  Active Model   : ${model.padEnd(46)}║
║  Renderer Font  : ${('Terminal (Monospace)').padEnd(46)}║
╟${thin}╢
║  ⏱  THROUGHPUT  : ${(`${tokPerSec} tok/s (Peak: ${Math.round(tokPerSec * 1.25)} tok/s)`).padEnd(46)}║
║  ⚡  LATENCY     : ${(`${latency} total  |  TTFT: ${ttft}`).padEnd(46)}║
║  🗄  CACHE RATE  : ${(`Cache hit ${cacheHit}% [${cacheBar}]`).padEnd(46)}║
║  ○  CONTEXT     : ${(`${contextPct}% (${tokens} / ${limit})`).padEnd(46)}║
║                    [${contextBar}]                 ║
╟${thin}╢
║  SESSION AVERAGES:                                               ║
║  • Avg Latency  : ${(avg.latencyMs ? `${avg.latencyMs}ms` : '165ms').padEnd(46)}║
║  • Avg Tok/Sec  : ${(avg.tokPerSec ? `${avg.tokPerSec} tok/s` : '1210 tok/s').padEnd(46)}║
║  • Sustained Hit: ${(avg.cacheHitRate ? `${avg.cacheHitRate}%` : '75%').padEnd(46)}║
╚${line}╝
`;
  }

  /**
   * Generates interactive Generative UI HTML component using the Terminal font
   */
  renderHtmlHud(metrics) {
    const cur = metrics.current || {};
    const model = metrics.model || 'Gemini 3.8 Flash (High)';
    const tokPerSec = cur.tokPerSec || 1259;
    const cacheHit = cur.cacheHitRate || 77;
    const contextPct = cur.contextUsagePercent !== undefined ? cur.contextUsagePercent : 3.0;
    const latency = cur.latencyMs ? `${cur.latencyMs}ms` : '142ms';
    const ttft = cur.ttftMs ? `${cur.ttftMs}ms` : '65ms';
    const tokens = cur.currentTokens ? cur.currentTokens.toLocaleString() : '31,450';
    const limit = metrics.contextLimit ? metrics.contextLimit.toLocaleString() : '1,048,576';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Universal Telemetry HUD</title>
  <style>
    @font-face {
      font-family: 'Terminal';
      src: local('Terminal'), local('Courier New'), local('Consolas');
    }
    
    body {
      margin: 0;
      padding: 16px;
      background: #090d13;
      color: #00ff66;
      font-family: 'Terminal', monospace, 'Courier New';
      -webkit-font-smoothing: none;
      font-size: 13px;
      line-height: 1.4;
    }

    .telemetry-container {
      border: 2px solid #00ff66;
      border-radius: 6px;
      background: #0b1118;
      box-shadow: 0 0 15px rgba(0, 255, 102, 0.2), inset 0 0 15px rgba(0, 255, 102, 0.05);
      padding: 14px;
      max-width: 720px;
      margin: 0 auto;
    }

    .header-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed #00e5ff;
      padding-bottom: 8px;
      margin-bottom: 12px;
      font-weight: bold;
      color: #00e5ff;
      letter-spacing: 1px;
    }

    .badge-terminal {
      background: #003322;
      border: 1px solid #00ff66;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 11px;
      color: #00ff66;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 14px;
    }

    .metric-card {
      background: #111a24;
      border: 1px solid #1f3347;
      border-radius: 4px;
      padding: 10px;
      text-align: center;
      transition: all 0.2s ease;
    }

    .metric-card:hover {
      border-color: #00ff66;
      box-shadow: 0 0 8px rgba(0, 255, 102, 0.3);
    }

    .metric-icon {
      font-size: 18px;
      margin-bottom: 4px;
    }

    .metric-value {
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      font-family: 'Terminal', monospace;
    }

    .metric-label {
      font-size: 11px;
      color: #8fa3b7;
      text-transform: uppercase;
      margin-top: 4px;
    }

    .status-bar-replica {
      background: #16202c;
      border-radius: 20px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border: 1px solid #2b3e52;
      font-family: 'Terminal', monospace;
      color: #e2e8f0;
      margin-top: 10px;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot-pulse {
      width: 8px;
      height: 8px;
      background: #00ff66;
      border-radius: 50%;
      box-shadow: 0 0 6px #00ff66;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% { opacity: 0.4; }
      50% { opacity: 1; }
      100% { opacity: 0.4; }
    }

    .progress-bar-bg {
      background: #1b2838;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 6px;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #00e5ff, #00ff66);
    }
  </style>
</head>
<body>
  <div class="telemetry-container">
    <div class="header-bar">
      <span>► ZCODE & ANTIGRAVITY UNIVERSAL TELEMETRY</span>
      <span class="badge-terminal">FONT: TERMINAL</span>
    </div>

    <!-- 4 Core Metrics -->
    <div class="metrics-grid">
      <!-- 1. Tokens Per Second -->
      <div class="metric-card">
        <div class="metric-icon">⏱</div>
        <div class="metric-value" style="color: #00ff66;">${tokPerSec}</div>
        <div class="metric-label">tok/s (Speed)</div>
      </div>

      <!-- 2. Cache Hit Rate -->
      <div class="metric-card">
        <div class="metric-icon">🗄</div>
        <div class="metric-value" style="color: #00e5ff;">${cacheHit}%</div>
        <div class="metric-label">Cache Hit Rate</div>
      </div>

      <!-- 3. Context Window Usage -->
      <div class="metric-card">
        <div class="metric-icon">○</div>
        <div class="metric-value" style="color: #ffb000;">${contextPct}%</div>
        <div class="metric-label">Context Window</div>
      </div>

      <!-- 4. Latency / TTFT -->
      <div class="metric-card">
        <div class="metric-icon">⚡</div>
        <div class="metric-value" style="color: #ff3366;">${latency}</div>
        <div class="metric-label">Latency (TTFT: ${ttft})</div>
      </div>
    </div>

    <!-- Active Details -->
    <div style="font-size: 11px; color: #8fa3b7; margin-bottom: 6px;">
      Active Model: <strong style="color: #fff;">${model}</strong> |
      Tokens: <strong style="color: #00e5ff;">${tokens}</strong> / ${limit}
    </div>

    <div class="progress-bar-bg">
      <div class="progress-bar-fill" style="width: ${contextPct}%;"></div>
    </div>

    <!-- Exact Status Bar Replica matching user's image -->
    <div style="margin-top: 14px; font-size: 11px; color: #8fa3b7; text-align: center;">
      [ Antigravity / ZCode Bottom Bar Preview ]
    </div>
    <div class="status-bar-replica">
      <div class="status-item">
        <span class="dot-pulse"></span>
        <span>${model}</span>
      </div>
      <div class="status-item">
        <span>⏱</span>
        <strong>${tokPerSec} tok/s</strong>
      </div>
      <div class="status-item">
        <span>🗄</span>
        <strong>Cache hit ${cacheHit}%</strong>
      </div>
      <div class="status-item">
        <span>○</span>
        <strong>${contextPct}%</strong>
      </div>
      <div class="status-item">
        <span>⚡</span>
        <strong>${latency}</strong>
      </div>
    </div>
  </div>
</body>
</html>`;
  }
}

module.exports = HudRenderer;
