import { supabase } from '../../lib/supabase'
import { generateEmojiForMatch } from '../../lib/emojiGenerator'

async function fillEmojis() {
  const { data: matches, error } = await supabase
    .from('matches')
    .select('id, name1, name2, emoji');

  if (error) {
    console.error('Error fetching matches:', error);
    return;
  }

  for (const match of matches) {
    if (!match.emoji) {
      const emoji = generateEmojiForMatch(match.id, match.name1, match.name2);
      const { error: updateError } = await supabase
        .from('matches')
        .update({ emoji })
        .eq('id', match.id);

      if (updateError) {
        console.error(`Error updating match ${match.id}:`, updateError);
      } else {
        console.log(`Updated match ${match.id} with emoji ${emoji}`);
      }
    }
  }
}

fillEmojis();
