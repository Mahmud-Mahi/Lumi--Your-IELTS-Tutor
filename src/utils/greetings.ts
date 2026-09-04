/**
 * Greeting scripts — gathered into this single module so no duplicate welcome
 * strings are in-lined across the app. Import these helpers anywhere Lumi
 * speaks or shows a welcome message instead of pasting the text by hand.
 *
 * Every helper returns the exact same text that used to be scattered inline so
 * nothing changes perceptibly for the user.
 */

/** Chat — Interview mode: 1v1 IELTS speaking session greeting (bubble + voice). */
export function greetInterview(nickname: string): string {
  return `Hey ${nickname}! Welcome to your 1v1 IELTS speaking session. Let's have a little chat — I'll ask you some questions, so just be yourself and answer naturally in 2-3 sentences.`;
}

/** Chat — Casual mode: the first message sent to the server to start the chat. */
export function casualSessionOpener(): string {
  return `Hey! Let's just chat — no exams, no pressure. What's been on your mind today?`;
}

/** Chat — Casual mode: built-in opener used when the server/LLM is unavailable. */
export function casualFallbackOpener(nickname: string): string {
  return `Hey ${nickname}, good to see you! What's been going on with you today?`;
}

/** Diagnostic test — Cambridge IELTS speaking practice welcome banner/speech. */
export function diagnosticGreetingIntro(nickname: string): string {
  return `Hi ${nickname}! Welcome to your Cambridge IELTS speaking practice.`;
}
export const diagnosticGreetingPrompt = 'Which test would you like to begin with today?';
export function diagnosticGreeting(nickname: string): string {
  return `${diagnosticGreetingIntro(nickname)} ${diagnosticGreetingPrompt}`;
}

/** Lesson studio — opening line when entering a roadmap module. */
export function lessonModuleIntro(moduleTitle: string, nickname: string, practicePrompt: string): string {
  return `Welcome to "${moduleTitle}", ${nickname}! Let's master this concept. Here is your practice prompt: ${practicePrompt}`;
}

/** Server — Casual chat greeting reply when the message is a simple hello/hi/hey. */
export function casualGreetingReply(nickname: string): string {
  return `Hey ${nickname}! Good to see you. So what's been going on — how's your day treating you?`;
}

/** Server — Interview/tutor greeting reply when the message is a simple hello/hi/hey. */
export function tutorGreetingReply(nickname: string): string {
  return `Hello ${nickname}! I'm so thrilled to be your English tutor today. What topic would you like to practice, or shall we dive straight into an IELTS mock question?`;
}