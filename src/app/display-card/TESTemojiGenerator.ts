// Test code for generateEmojiForMatch
import { generateEmojiForMatch } from '../../lib/emojiGenerator.ts';

const testCases = [
  { id: "1", name1: "Alice", name2: "Bob" },
  { id: "2", name1: "Charlie", name2: "Dana" },
  { id: "3", name1: "Eve", name2: "Frank" },
  { id: "4", name1: "Grace", name2: "Heidi" },
  { id: "5", name1: "Ivan", name2: "Judy" },
  { id: "1", name1: "Alice", name2: "Bob" }, 
];

for (const test of testCases) {
  const emoji = generateEmojiForMatch(test.id, test.name1, test.name2);
  console.log(`Match (${test.id}, ${test.name1}, ${test.name2}) => ${emoji}`);
}
// run this to try: npx ts-node ./src/app/display-card/TESTemojiGenerator.ts