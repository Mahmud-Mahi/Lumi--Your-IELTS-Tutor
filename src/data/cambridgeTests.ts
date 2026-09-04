import { DiagnosticQuestion } from '../types';
import p1Data from '../../assets/cambridge-ielts-p1.json';
import p2Data from '../../assets/cambridge-ielts-p2.json';
import p3Data from '../../assets/cambridge-ielts-p3.json';

type CambridgePartDataItem = {
  header: string;
  topic: string;
  part: string;
  instruction: string;
  response?: string;
};

export interface CambridgeTestDefinition {
  id: string;
  label: string;
  questions: DiagnosticQuestion[];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const buildQuestion = (
  testId: string,
  testLabel: string,
  raw: CambridgePartDataItem,
  part: 1 | 2 | 3,
  index: number
): DiagnosticQuestion => {
  const baseInstructions = {
    1: 'Speak naturally for 30 to 45 seconds. Aim for full sentences and give a clear opinion or example.',
    2: 'You have one minute to prepare before you speak for up to two minutes. Try to speak continuously.',
    3: 'Answer in a thoughtful way. Explore reasons, examples, and balanced views for 45 to 60 seconds.',
  };

  const baseCueTips = {
    1: [
      'Answer directly and give a personal example.',
      'Use a range of linking words like because, as well as, and however.',
      'Add a short conclusion to sound natural and complete.',
    ],
    2: [
      'Use a clear structure: beginning, main points, and conclusion.',
      'Include examples and personal detail to add depth.',
      'Use discourse markers to make your speech flow smoothly.',
    ],
    3: [
      'Give a balanced viewpoint with both sides of the argument.',
      'Support your ideas with real examples or general observations.',
      'Use higher-level phrases to sound natural and analytical.',
    ],
  };

  return {
    id: `${testId}-part-${part}-${index + 1}`,
    part,
    partTitle: `Part ${part}: ${part === 1 ? 'Introduction & Lifestyle' : part === 2 ? 'Cue Card' : 'Two-Way Discussion'}`,
    topic: raw.topic || testLabel,
    question: raw.instruction,
    instructions: baseInstructions[part],
    prepTimeSeconds: part === 2 ? 60 : part === 3 ? 10 : 5,
    speakTimeSeconds: part === 2 ? 120 : part === 3 ? 60 : 45,
    cueTips: baseCueTips[part],
    sampleAnswer: raw.response || '',
  };
};

const buildTest = (header: string): CambridgeTestDefinition => {
  const cleanedHeader = header.trim();
  const testId = `cambridge-${slugify(cleanedHeader)}`;

  const withHeader = (part: string) =>
    (part === 'Part 1' ? p1Data : part === 'Part 2' ? p2Data : p3Data) as CambridgePartDataItem[];

  const part1Questions = withHeader('Part 1')
    .filter((item) => item.header === cleanedHeader)
    .map((item, index) => buildQuestion(testId, cleanedHeader, item, 1, index));

  const part2Questions = withHeader('Part 2')
    .filter((item) => item.header === cleanedHeader)
    .map((item, index) => buildQuestion(testId, cleanedHeader, item, 2, index));

  const part3Questions = withHeader('Part 3')
    .filter((item) => item.header === cleanedHeader)
    .map((item, index) => buildQuestion(testId, cleanedHeader, item, 3, index));

  return {
    id: testId,
    label: cleanedHeader,
    questions: [...part1Questions, ...part2Questions, ...part3Questions],
  };
};

const getTestSortKey = (header: string) => {
  const match = header.match(/(\d{4})\s*\((?:Test-?|test-?)(\d+)\)/i);
  if (!match) {
    return { year: 0, testNumber: 0, label: header.toLowerCase() };
  }

  return {
    year: Number(match[1]),
    testNumber: Number(match[2]),
    label: header.toLowerCase(),
  };
};

export const CAMBRIDGE_TESTS: CambridgeTestDefinition[] = Array.from(
  new Set([
    ...((p1Data as CambridgePartDataItem[]).map((item) => item.header)),
    ...((p2Data as CambridgePartDataItem[]).map((item) => item.header)),
    ...((p3Data as CambridgePartDataItem[]).map((item) => item.header)),
  ])
)
  .filter(Boolean)
  .sort((a, b) => {
    const aKey = getTestSortKey(a);
    const bKey = getTestSortKey(b);

    if (bKey.year !== aKey.year) return bKey.year - aKey.year;
    if (bKey.testNumber !== aKey.testNumber) return aKey.testNumber - bKey.testNumber;
    return aKey.label.localeCompare(bKey.label);
  })
  .map(buildTest);

export const getCambridgeTestById = (id: string) =>
  CAMBRIDGE_TESTS.find((test) => test.id === id) || CAMBRIDGE_TESTS[0] || null;

export const getCambridgeTestByLabel = (label: string) =>
  CAMBRIDGE_TESTS.find((test) => test.label === label) || CAMBRIDGE_TESTS[0] || null;
