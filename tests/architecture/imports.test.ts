import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Recursively list all .ts/.tsx files under a directory
function listSourceFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listSourceFiles(full));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const ROOT = path.resolve(__dirname, '../../src');
const COMPONENTS = path.join(ROOT, 'components');
const DATA = path.join(ROOT, 'data');
const APP = path.join(ROOT, 'app');

describe('Architecture: import discipline', () => {
  it('data files do not import from components', () => {
    const violations: string[] = [];
    for (const file of listSourceFiles(DATA)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes("from '@/components") || content.includes("from '../components")) {
        violations.push(file);
      }
    }
    if (violations.length > 0) {
      throw new Error(
        `Data files must not import from components. Violators:\n${violations.join('\n')}\n` +
        'Fix: move shared logic to src/lib/ instead.'
      );
    }
    expect(violations).toHaveLength(0);
  });

  it('data files do not import from app/', () => {
    const violations: string[] = [];
    for (const file of listSourceFiles(DATA)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes("from '@/app") || content.includes("from '../app")) {
        violations.push(file);
      }
    }
    expect(violations).toHaveLength(0);
  });

  it('components do not import from app/', () => {
    const violations: string[] = [];
    for (const file of listSourceFiles(COMPONENTS)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes("from '@/app") || content.includes("from '../app")) {
        violations.push(file);
      }
    }
    if (violations.length > 0) {
      throw new Error(
        `Components must not import from app/. Violators:\n${violations.join('\n')}\n` +
        'Fix: move shared logic to src/lib/ or src/data/.'
      );
    }
    expect(violations).toHaveLength(0);
  });

  it('VirginiaMode does not auto-advance (no setTimeout goToNext)', () => {
    const file = path.resolve(__dirname, '../../src/components/virginia-mode/VirginiaMode.tsx');
    const content = fs.readFileSync(file, 'utf8');
    // The auto-advance pattern was: setTimeout(goToNext, 14000)
    expect(content).not.toMatch(/setTimeout\s*\(\s*goToNext/);
  });

  it('no console.log or debugger in source files', () => {
    const violations: string[] = [];
    for (const file of listSourceFiles(ROOT)) {
      const content = fs.readFileSync(file, 'utf8');
      if (/console\.log\(/.test(content) || /\bdebugger\b/.test(content)) {
        violations.push(file);
      }
    }
    if (violations.length > 0) {
      throw new Error(
        `Debug artifacts found in source files:\n${violations.join('\n')}\n` +
        'Fix: remove console.log and debugger statements.'
      );
    }
    expect(violations).toHaveLength(0);
  });
});
