// src/lib/matchmaker/testMatch2k.ts

import 'dotenv/config';
import { supabase } from '../supabase.js';

/**
 * Deletes all rows from curr_matches table.
 */
export async function clearCurrMatchesTable() {
    const { error } = await supabase
        .from('curr_matches')
        .delete()
        .not('person1_id', 'is', null); // delete every row where person1_id is not null

    if (error) {
        console.error('Failed to clear curr_matches table:', error);
        process.exit(1);
    }

    console.log('Deleted all rows from curr_matches table.');
}

/**
 * SIDE EFFECTS: 
 * - WILL CLEAR ALL ROWS OF THE curr_matches TABLE.
 */
async function main() {
    // 0) Clear the curr_matches table of all matches. 
    clearCurrMatchesTable();

    // 1) Fetch all form_responses IDs
    const { data: forms, error: fetchErr } = await supabase
        .from('form_responses')
        .select('id')
        .order('id', { ascending: true });

    if (fetchErr) {
        console.error('Could not fetch form_responses:', fetchErr);
        process.exit(1);
    }
    if (!forms || forms.length < 2) {
        console.error('Need at least two form_responses rows');
        process.exit(1);
    }

    // 2) Build even pairs and prepare insert payloads
    const inserts = [] as Array<{
        person1_id: string;
        person2_id: string;
        similarity_score: number;
        emoji: string;
    }>;

    for (let i = 0; i + 1 < forms.length; i += 2) {
        inserts.push({
        person1_id: forms[i].id,
        person2_id: forms[i + 1].id,
        similarity_score: 0.55,
        emoji: 'TBD',
        });
    }

    if (inserts.length === 0) {
        console.log('No pairs to insert.');
        return;
    }

    // 3) Insert into curr_matches
    const { data: inserted, error: insertErr } = await supabase
        .from('curr_matches')
        .insert(inserts)
        .select('*');

    if (insertErr) {
        console.error('Insert failed:', insertErr);
        process.exit(1);
    }

console.log(`Inserted ${inserted?.length ?? 0} curr_matches:`,
    inserted);
}

main();
