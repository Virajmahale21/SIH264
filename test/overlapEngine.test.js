import assert from 'node:assert';
import {
  tokenizeText,
  getNGrams,
  computeCosineSimilarity,
  computeJaccardSimilarity,
  computeCategoryScore,
  computeTimelineScore,
  extractMatchedEntities,
  analyzeComplaintPair
} from '../server/services/overlapEngine.js';

console.log('=============================================================');
console.log('🧪  AICTE PS 264 — OVERLAP ENGINE UNIT TEST SUITE');
console.log('=============================================================');

let passedCount = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// Suite 1: Tokenizer & N-Grams
console.log('\n--- Test Suite 1: Tokenizer & N-Gram Generation ---');
test('Tokenize handles null or empty input safely', () => {
  assert.deepStrictEqual(tokenizeText(null), []);
  assert.deepStrictEqual(tokenizeText(''), []);
});

test('Tokenize strips stopwords and standardizes tokens', () => {
  const tokens = tokenizeText('The student lodged a complaint regarding excessive tuition fees');
  assert.ok(!tokens.includes('the'));
  assert.ok(!tokens.includes('regarding'));
  assert.ok(tokens.includes('tuition') || tokens.includes('fee'));
});

test('getNGrams generates bigrams correctly', () => {
  const tokens = ['faculty', 'shortage', 'salary'];
  const bigrams = getNGrams(tokens, 2);
  assert.strictEqual(bigrams.length, 2);
  assert.strictEqual(bigrams[0], 'faculty shortage');
  assert.strictEqual(bigrams[1], 'shortage salary');
});

// Suite 2: Mathematical Similarity Functions
console.log('\n--- Test Suite 2: Similarity Scoring Algorithms ---');
test('computeCosineSimilarity returns 1.0 for identical token sets', () => {
  const tokens = ['cadre', 'ratio', 'unpaid'];
  const sim = computeCosineSimilarity(tokens, tokens);
  assert.strictEqual(Math.round(sim * 100) / 100, 1.0);
});

test('computeCosineSimilarity returns 0.0 for disjoint sets', () => {
  const tokensA = ['ragging', 'hostel'];
  const tokensB = ['salary', 'cheque'];
  const sim = computeCosineSimilarity(tokensA, tokensB);
  assert.strictEqual(sim, 0.0);
});

test('computeJaccardSimilarity correctly calculates intersection over union', () => {
  const arrA = ['a', 'b', 'c'];
  const arrB = ['b', 'c', 'd'];
  // Intersection = 2, Union = 4 => 0.5
  const jaccard = computeJaccardSimilarity(arrA, arrB);
  assert.strictEqual(jaccard, 0.5);
});

// Suite 3: Domain & Category Scoring
console.log('\n--- Test Suite 3: Category & Domain Knowledge Matching ---');
test('computeCategoryScore gives 1.0 for exact category match', () => {
  const score = computeCategoryScore('Fee Extortion', 'Fee Extortion');
  assert.strictEqual(score, 1.0);
});

test('computeCategoryScore returns baseline score for unrelated categories', () => {
  const score = computeCategoryScore('Hostel Ragging', 'Unapproved Course');
  assert.strictEqual(score, 0.15);
});

// Suite 4: Timeline Decay Scoring
console.log('\n--- Test Suite 4: Timeline Decay Curves ---');
test('computeTimelineScore gives 1.0 for same-day filings', () => {
  const today = new Date();
  const res = computeTimelineScore(today, today);
  assert.strictEqual(res.score, 1.0);
  assert.strictEqual(res.diffDays, 0);
});

test('computeTimelineScore decays as temporal distance increases', () => {
  const d1 = new Date('2026-01-01');
  const d2 = new Date('2026-01-20'); // 19 days
  const d3 = new Date('2026-06-01'); // 151 days
  const resNear = computeTimelineScore(d1, d2);
  const resFar = computeTimelineScore(d1, d3);
  assert.ok(resNear.score > resFar.score, 'Closer dates should produce higher temporal score');
});

// Suite 5: Pair Analysis & Disambiguation
console.log('\n--- Test Suite 5: Pair Analysis & Case Disambiguation ---');
test('analyzeComplaintPair detects parallel cross-bureau overlap', () => {
  const complaintA = {
    id: 'c1',
    category: 'Fee Extortion',
    department: 'PGRC',
    createdAt: new Date('2026-10-01'),
    description: 'Illegal capitation fee and withholding original marksheets without refund'
  };
  const complaintB = {
    id: 'c2',
    category: 'Fee Extortion',
    department: 'Regulation Bureau',
    createdAt: new Date('2026-10-05'),
    description: 'Demand for donation cash and non-refund of caution deposit marksheets'
  };
  const inst = { id: 'inst1', aicteId: '1-12345678', name: 'National Institute of Technology' };

  const analysis = analyzeComplaintPair(complaintA, complaintB, inst);
  assert.ok(analysis.similarityScore >= 0.55, `Expected similarity score >= 0.55, got ${analysis.similarityScore}`);
  assert.ok(analysis.matchedSignals.length > 0);
  assert.strictEqual(analysis.isCrossBureau, true);
});

test('analyzeComplaintPair properly disambiguates distinct issues on same institute', () => {
  const complaintA = {
    id: 'c1',
    category: 'Hostel Ragging',
    department: 'PGRC',
    createdAt: new Date('2026-01-01'),
    description: 'Physical assault and ragging incident in boys hostel wing B'
  };
  const complaintB = {
    id: 'c2',
    category: 'Faculty Cadre Ratio',
    department: 'Regulation Bureau',
    createdAt: new Date('2026-09-01'),
    description: 'Shortage of assistant professors in mechanical department 7th CPC'
  };
  const inst = { id: 'inst1', aicteId: '1-12345678', name: 'National Institute of Technology' };

  const analysis = analyzeComplaintPair(complaintA, complaintB, inst);
  assert.ok(analysis.similarityScore < 0.50, `Expected distinct complaints to score < 0.50, got ${analysis.similarityScore}`);
  assert.strictEqual(analysis.isCommonInstitutionOnly, true);
});

console.log('\n=============================================================');
console.log(`🎉 ALL ${passedCount}/${passedCount} OVERLAP ENGINE TESTS PASSED!`);
console.log('=============================================================\n');
