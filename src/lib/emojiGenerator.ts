// Emoji Unicode ranges for different categories
const emojiRanges = {
  face: { start: 0x1f601, range: 79 },    // Faces
  symbol: { start: 0x1f680, range: 70 },  // Transport & map symbols
  animal: { start: 0x1f400, range: 52 },  // Animals
};

// Deterministically generate a unique emoji for a match based on its id and names
export function generateEmojiForMatch(id: string, name1: string, name2: string): string {
  // Combine id and names to create a hash
  const key = `${id}-${name1}-${name2}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const types = Object.keys(emojiRanges) as Array<'face' | 'symbol' | 'animal'>;
  const type = types[Math.abs(hash) % types.length];
  const { start, range } = emojiRanges[type];
  const codePoint = start + Math.abs(hash) % range;
  return String.fromCodePoint(codePoint);
}