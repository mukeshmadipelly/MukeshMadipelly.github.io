// Pure keyword router — no DOM, no side effects, fully testable.
/**
 * @param {string} text
 * @returns {{ answer: string, action?: string }}
 */
export function routeQuestion(text) {
  const t = text.toLowerCase().trim();

  if (t.includes('project')) {
    return { answer: 'Here are my selected projects — scroll down to explore.', action: 'scroll#projects' };
  }

  if (t.includes('resume') || t.includes('cv')) {
    return { answer: 'Starting the resume download…', action: 'download-resume' };
  }

  if (t.includes('skill') || t.includes('tech') || t.includes('language') || t.includes('stack')) {
    return { answer: 'My tech stack is listed in the Skills section.', action: 'scroll#skills' };
  }

  if (t.includes('experience') || t.includes('work') || t.includes('company') || t.includes('zyrix')) {
    return { answer: 'My experience timeline is in the Experience section.', action: 'scroll#experience' };
  }

  if (t.includes('contact') || t.includes('reach') || t.includes('email') || t.includes('hire')) {
    return { answer: 'You can reach me via the Contact section.', action: 'scroll#contact' };
  }

  if (t.includes('who') || t.includes('name') || t.includes('mukesh') || t.includes('you are')) {
    return { answer: "Hi, this is me — I'm Mukesh's portfolio assistant. I can tell you about his projects, skills, experience, or help you download his resume. What would you like to know?", action: undefined };
  }

  return { answer: "I only know what's on this page — try asking about projects, resume, skills, experience, or contact.", action: undefined };
}