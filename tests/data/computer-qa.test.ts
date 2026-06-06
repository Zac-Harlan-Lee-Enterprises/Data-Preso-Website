import { describe, it, expect } from 'vitest';
import { COMPUTER_QA, matchQuestion } from '@/data/computer-qa';

describe('computer-qa data integrity', () => {
  it('all entries have required fields', () => {
    for (const qa of COMPUTER_QA) {
      expect(qa.id, `Entry missing id`).toBeTruthy();
      expect(qa.question, `${qa.id} missing question`).toBeTruthy();
      expect(qa.keywords, `${qa.id} missing keywords`).toBeInstanceOf(Array);
      expect(qa.keywords.length, `${qa.id} must have at least one keyword`).toBeGreaterThan(0);
      expect(qa.category, `${qa.id} missing category`).toBeTruthy();

      const r = qa.response;
      expect(r.answer, `${qa.id} missing answer`).toBeTruthy();
      expect(r.strategicImpact, `${qa.id} missing strategicImpact`).toBeTruthy();
      expect(r.businessValue, `${qa.id} missing businessValue`).toBeTruthy();
      expect(r.riskReduction, `${qa.id} missing riskReduction`).toBeTruthy();
      expect(r.supportingEvidence, `${qa.id} missing supportingEvidence`).toBeTruthy();
      expect(r.nextStep, `${qa.id} missing nextStep`).toBeTruthy();
    }
  });

  it('all ids are unique', () => {
    const ids = COMPUTER_QA.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('has at least 15 Q&A entries', () => {
    expect(COMPUTER_QA.length).toBeGreaterThanOrEqual(15);
  });

  it('matchQuestion finds canonical models question', () => {
    const result = matchQuestion('why do canonical models matter');
    expect(result).toBeDefined();
    expect(result?.id).toBe('canonical-models');
  });

  it('matchQuestion finds acquisition question', () => {
    const result = matchQuestion('Computer, how does acquisition integration work?');
    expect(result).toBeDefined();
    expect(result?.id).toBe('acquisition-integration');
  });

  it('matchQuestion finds medallion architecture question', () => {
    const result = matchQuestion('what is the medallion architecture');
    expect(result).toBeDefined();
    expect(result?.id).toBe('medallion-architecture');
  });

  it('matchQuestion returns undefined for unknown question', () => {
    const result = matchQuestion('what is the weather tomorrow in Paris');
    expect(result).toBeUndefined();
  });

  it('matchQuestion strips Computer prefix', () => {
    const withPrefix = matchQuestion('Computer, explain the governance model');
    const withoutPrefix = matchQuestion('explain the governance model');
    expect(withPrefix?.id).toBe(withoutPrefix?.id);
    expect(withPrefix?.id).toBe('governance');
  });
});
