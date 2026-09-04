import { DiagnosticQuestion } from '../types';

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-part-1',
    part: 1,
    partTitle: 'Part 1: Introduction & Lifestyle',
    topic: 'Hometown & Daily Environment',
    question: 'Could you tell me a little about where you grew up, and what you find most appealing about your hometown or neighborhood?',
    instructions: 'Speak naturally for 30 to 45 seconds. Aim for full sentences without brief one-word answers.',
    prepTimeSeconds: 5,
    speakTimeSeconds: 45,
    cueTips: [
      'Mention geographic setting & atmosphere',
      'Use descriptive adjectives (bustling, serene, historic, cosmopolitan)',
      'Explain *why* you enjoy or appreciate it'
    ]
  },
  {
    id: 'diag-part-2',
    part: 2,
    partTitle: 'Part 2: The Individual Long Turn (Cue Card)',
    topic: 'Personal Ambition & Growth',
    question: 'Describe an important goal or ambition you are striving to achieve in your life.',
    instructions: 'You have a short moment to organize your ideas, then speak continuously for 1 to 2 minutes.',
    prepTimeSeconds: 60,
    speakTimeSeconds: 120,
    bulletPoints: [
      'What this ambition or goal is',
      'When you first decided to pursue it',
      'What steps or challenges are involved in achieving it',
      'And explain why this goal is particularly meaningful to you'
    ],
    cueTips: [
      'Structure with past background, present actions, and future outlook',
      'Use discourse markers (initially, subsequently, moreover, pivotal)',
      'Expand on the emotional impact and life transformation'
    ]
  },
  {
    id: 'diag-part-3',
    part: 3,
    partTitle: 'Part 3: Abstract Two-Way Discussion',
    topic: 'Technology, Motivation & Society',
    question: 'In your opinion, how has the rapid rise of modern technology and social platforms altered the way younger generations define success?',
    instructions: 'Provide an analytical, well-reasoned response for 45 to 60 seconds with supporting examples.',
    prepTimeSeconds: 10,
    speakTimeSeconds: 60,
    cueTips: [
      'Compare past vs present paradigms',
      'Acknowledge both sides (broadened opportunities vs comparison pressure)',
      'Use speculative & evaluative language (It is widely argued that, on the one hand...)'
    ]
  }
];
