/**
 * Quick harness: feeds a deliberately partial evaluation (like a truncated,
 * rate-limited LLM response) through normalizeEvaluation and asserts the
 * result is complete enough for EvaluationReport to render safely.
 */
import { normalizeEvaluation } from '../src/utils/evaluation';

const partial: any = {
  overallCEFR: 'B2',
  predictedIeltsBand: '6.5', // string, as models often return
  executiveSummary: 'Nice work!',
  pillars: {
    fluency: { score: 6, strengths: 'Good flow', growthAreas: null }, // string + missing fields
    // lexical, grammar, pronunciation missing entirely
  },
  // upgradedExpressions, pronunciationTips, stats, lessonRoadmap missing
};

const n = normalizeEvaluation(partial);

const checks: [string, boolean][] = [
  ['band is a number', typeof n.predictedIeltsBand === 'number' && n.predictedIeltsBand === 6.5],
  ['all four pillars exist', ['fluency', 'lexical', 'grammar', 'pronunciation'].every((k) => (n.pillars as any)[k])],
  ['pillar score is a number', typeof n.pillars.lexical.score === 'number'],
  ['pillar strengths is an array (string coerced)', Array.isArray(n.pillars.fluency.strengths) && n.pillars.fluency.strengths.length === 1],
  ['missing strengths become empty array', Array.isArray(n.pillars.lexical.strengths)],
  ['stats.estimatedWPM is a number', typeof n.stats.estimatedWPM === 'number'],
  ['stats literal unions filled', typeof n.stats.pauseFluencyRating === 'string' && typeof n.stats.varietyRating === 'string'],
  ['upgradedExpressions is an array', Array.isArray(n.upgradedExpressions)],
  ['pronunciationTips is an array', Array.isArray(n.pronunciationTips)],
  ['lessonRoadmap is an array', Array.isArray(n.lessonRoadmap)],
  ['cefrDescriptor defaulted', typeof n.cefrDescriptor === 'string' && n.cefrDescriptor.length > 0],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) failed++;
}
console.log(failed === 0 ? 'ALL PASS' : `${failed} FAILED`);
process.exit(failed === 0 ? 0 : 1);
