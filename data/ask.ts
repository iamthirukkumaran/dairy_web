export const askQuestions = [
  'When did I first start thinking about changing jobs?',
  'What kept making me happy this year?',
  'Who was there during my best moments?',
  'What did I keep putting off?',
  'How have I changed?',
];

export type AskResult = {
  id: string;
  date: string;
  line: string;
  tone: 'peach' | 'sage' | 'lavender' | 'sun' | 'cream';
};

export const askResults: AskResult[] = [
  { id: 'r1', date: 'FEB 14', line: 'First time you wrote the word "restless".', tone: 'lavender' },
  { id: 'r2', date: 'APR 02', line: 'The walk where you said it out loud.', tone: 'sage' },
  { id: 'r3', date: 'JUN 19', line: 'You updated your CV and closed the tab.', tone: 'peach' },
  { id: 'r4', date: 'JUL 08', line: 'Coffee with Dev. He asked the right question.', tone: 'cream' },
  { id: 'r5', date: 'AUG 11', line: 'Shipped it. Something loosened.', tone: 'sun' },
  { id: 'r6', date: 'AUG 26', line: 'The day things finally started to feel right.', tone: 'peach' },
];
