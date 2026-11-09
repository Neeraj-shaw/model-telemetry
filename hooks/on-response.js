#!/usr/bin/env node
/**
 * Lifecycle Hook Script for PostInvocation / SessionStart
 * Updates telemetry metrics cache and refreshes statusline
 */

const path = require('path');
const fs = require('fs');
const TelemetryEngine = require('../src/telemetry-engine');
const HudRenderer = require('../src/hud-renderer');

const engine = new TelemetryEngine();
const renderer = new HudRenderer({ fontFamily: 'Terminal' });

try {
  const metrics = engine.analyzeTranscript();
  const cacheFile = path.join(__dirname, '..', '.telemetry_cache.json');
  fs.writeFileSync(cacheFile, JSON.stringify(metrics, null, 2), 'utf8');

  // Print brief status bar notification to stderr/stdout
  const statusLine = renderer.renderStatusBar(metrics);
  process.stdout.write(`[TELEMETRY] ${statusLine}\n`);
} catch (err) {
  // Silent fail in hook to not interrupt agent loop
}
