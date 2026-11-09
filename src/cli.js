#!/usr/bin/env node
/**
 * Standalone CLI runner for Universal Telemetry HUD
 * Usage:
 *   node src/cli.js
 *   node src/cli.js --status-bar
 *   node src/cli.js --json
 *   node src/cli.js --html
 */

const TelemetryEngine = require('./telemetry-engine');
const HudRenderer = require('./hud-renderer');

const engine = new TelemetryEngine();
const renderer = new HudRenderer({ fontFamily: 'Terminal' });

const args = process.argv.slice(2);

function run() {
  const customPath = args.find(a => !a.startsWith('--'));
  const metrics = engine.analyzeTranscript(customPath);

  if (args.includes('--status-bar')) {
    console.log(renderer.renderStatusBar(metrics));
    return;
  }

  if (args.includes('--json')) {
    console.log(JSON.stringify(metrics, null, 2));
    return;
  }

  if (args.includes('--html')) {
    console.log(renderer.renderHtmlHud(metrics));
    return;
  }

  // Default: Print Terminal HUD
  console.log(renderer.renderTerminalBox(metrics));
}

run();
