import { supabase } from './supabase.js'

// --- Logic from emojiGenerator.ts ---
const emojiRanges = {
  face: { start: 0x1f601, range: 79 },
  symbol: { start: 0x1f680, range: 70 },
  animal: { start: 0x1f400, range: 52 },
};

function generateEmojiForMatch(id: string, name1: string, name2: string): string {
  const key = `${id}-${name1}-${name2}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const types = Object.keys(emojiRanges) as Array<'face' | 'symbol' | 'animal'>;
  const type = types[Math.abs(hash) % types.length];
  const { start, range } = emojiRanges[type];
  const codePoint = start + Math.abs(hash) % range;
  return String.fromCodePoint(codePoint);
}
// --- End of combined logic ---

async function fillEmojis() {
  console.log('Fetching matches to fill emojis...');
  const { data: matches, error } = await supabase
    .from('curr_matches')
    .select('id, person1_id, person2_id, emoji');

  if (error) {
    console.error('Error fetching matches:', error);
    return;
  }

  if (!matches || matches.length === 0) {
    console.log('No matches found.');
    return;
  }

  let updatedCount = 0;
  for (const match of matches) {
    if (!match.emoji) {
      const emoji = generateEmojiForMatch(match.id, match.person1_id, match.person2_id);
      const { error: updateError } = await supabase
        .from('curr_matches')
        .update({ emoji })
        .eq('id', match.id);

      if (updateError) {
        console.error(`Error updating match ${match.id}:`, updateError);
      } else {
        console.log(`Updated match ${match.id} with emoji ${emoji}`);
        updatedCount++;
      }
    }
  }

  if (updatedCount === 0) {
    console.log('All matches already have emojis. No updates needed.');
  } else {
    console.log(`Finished. Updated ${updatedCount} matches.`);
  }
}

fillEmojis();
