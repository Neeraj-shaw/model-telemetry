#!/usr/bin/env node
const TelemetryEngine = require('../../../src/telemetry-engine');
const engine = new TelemetryEngine();
const metrics = engine.analyzeTranscript();
console.log(JSON.stringify(metrics, null, 2));
