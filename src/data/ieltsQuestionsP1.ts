import rawQuestions from '../../assets/ielts-questions-p1.json';

export interface IELTSPart1Question {
  topic: string;
  part: string;
  instruction: string;
  response: string;
}

export const IELTS_P1_QUESTIONS: IELTSPart1Question[] = (rawQuestions as any[]).map((q) => ({
  topic: String(q.topic || ''),
  part: String(q.part || ''),
  instruction: String(q.instruction || ''),
  response: String(q.response || ''),
}));

export function getUniqueTopics(): string[] {
  return [...new Set(IELTS_P1_QUESTIONS.map((q) => q.topic))];
}

export function getQuestionsByTopic(topic: string): IELTSPart1Question[] {
  return IELTS_P1_QUESTIONS.filter((q) => q.topic === topic);
}

export function pickRandomTopic(exclude: string[]): string | null {
  const available = getUniqueTopics().filter((t) => !exclude.includes(t));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}
