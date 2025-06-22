import { generateEmojiForMatch } from './src/lib/emojiGenerator.ts';

// Simple test with fake data
console.log('Testing emoji generation:');

const testData = [
  { id: '1', name1: 'Alice', name2: 'Bob' },
  { id: '2', name1: 'Charlie', name2: 'Diana' },
  { id: '3', name1: 'Eve', name2: 'Frank' }
];

testData.forEach(match => {
  const emoji = generateEmojiForMatch(match.id, match.name1, match.name2);
  console.log(`${match.name1} & ${match.name2} -> ${emoji}`);
});

console.log('Done!'); 