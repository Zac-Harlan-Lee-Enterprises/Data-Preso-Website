import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const VIRGINIA_MODE_PATH = path.resolve(
  __dirname,
  '../../src/components/virginia-mode/VirginiaMode.tsx'
);

const source = fs.readFileSync(VIRGINIA_MODE_PATH, 'utf8');

describe('VirginiaMode: config alignment', () => {
  it('imports MISSION_PROGRESS from mission-config', () => {
    expect(source).toMatch(/MISSION_PROGRESS.*from.*mission-config/);
  });

  it('imports READINESS_VALUES from mission-config', () => {
    expect(source).toMatch(/READINESS_VALUES.*from.*mission-config/);
  });

  it('does not hardcode AI readiness as 45 percent', () => {
    expect(source).not.toContain('45 percent');
  });

  it('references READINESS_VALUES.aiReadiness in the AI-vision computer voice', () => {
    expect(source).toContain('READINESS_VALUES.aiReadiness');
  });

  it('does not hardcode Phase 1 progress as 55', () => {
    expect(source).not.toContain('pct: 55');
  });

  it('uses MISSION_PROGRESS for Phase 1 progress bar', () => {
    expect(source).toContain('pct: MISSION_PROGRESS');
  });

  it('uses admiral red (#ef4444) for the portrait ring, not the step accent', () => {
    expect(source).toContain("ADMIRAL_RED = '#ef4444'");
    // The conic-gradient and box-shadow should reference ADMIRAL_RED, not step.accent
    const conicLine = source.split('\n').find((l) => l.includes('conic-gradient'));
    expect(conicLine).toBeDefined();
    expect(conicLine).toContain('ADMIRAL_RED');
    expect(conicLine).not.toContain('step.accent');
  });
});
