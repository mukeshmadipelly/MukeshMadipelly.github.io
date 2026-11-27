// Run with: node --test
// Tests the pure keyword router in chatbot.js — no DOM involved.
import test from 'node:test';
import assert from 'node:assert/strict';
import { routeQuestion } from './chatbot.mjs';

test('routes project questions to the projects section', () => {
  const r = routeQuestion('show me your projects');
  assert.equal(r.action, 'scroll#projects');
  assert.equal(typeof r.answer, 'string');
});

test('routes resume requests to the download action', () => {
  assert.equal(routeQuestion('I want the resume').action, 'download-resume');
  assert.equal(routeQuestion('download my resume please').action, 'download-resume');
});

test('routes skill questions to the skills section', () => {
  assert.equal(routeQuestion('what technologies do you use?').action, 'scroll#skills');
  assert.equal(routeQuestion('your programming languages?').action, 'scroll#skills');
});

test('routes experience and company questions to the experience section', () => {
  assert.equal(routeQuestion('where do you work?').action, 'scroll#experience');
  assert.equal(routeQuestion('your experience at zyrix?').action, 'scroll#experience');
});

test('routes contact questions to the contact section', () => {
  assert.equal(routeQuestion('how can I reach you?').action, 'scroll#contact');
  assert.equal(routeQuestion('your email?').action, 'scroll#contact');
});

test('answers identity questions without a navigation action', () => {
  const r = routeQuestion('who are you?');
  assert.equal(r.action, undefined);
  assert.match(r.answer, /mukesh/i);
});

test('falls back to guidance for unknown questions', () => {
  const r = routeQuestion('how much rain falls in Hyderabad this year?');
  assert.equal(r.action, undefined);
  assert.match(r.answer, /only know/i);
});

test('is case-insensitive', () => {
  assert.equal(routeQuestion('RESUME!').action, 'download-resume');
  assert.equal(routeQuestion('PROJECTS').action, 'scroll#projects');
});

test('project wins over experience when both keywords are present', () => {
  // "which projects use networking?" — network contains "work" as a substring,
  // but the project rule is checked first, so projects is the right answer.
  const r = routeQuestion('which projects involve a work dashboard?');
  assert.equal(r.action, 'scroll#projects');
});
