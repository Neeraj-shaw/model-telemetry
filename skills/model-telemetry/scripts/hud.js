#!/usr/bin/env node
const TelemetryEngine = require('../../../src/telemetry-engine');
const HudRenderer = require('../../../src/hud-renderer');

const engine = new TelemetryEngine();
const renderer = new HudRenderer({ fontFamily: 'Terminal' });

const metrics = engine.analyzeTranscript();
console.log(renderer.renderTerminalBox(metrics));
