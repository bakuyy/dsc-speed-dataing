// src/lib/matchmaker/match.ts

import 'dotenv/config';
import { supabase } from '../supabase.js';
import { 
    clearCurrMatchesTable, 
    updateFormResponsesTableWithVectorEmbeddings, 
    handleOddParticipant,
    matchParticipants,
    updateCurrMatches,
    updatePreviousMatches
} from './embeddings.js';
import { fillEmojis } from '../fillEmojis.js';

/**
 * MATCHING ALGORITHM: 
 * - UPDATES form_responses TABLE WITH A numeric[] VECTOR EMBEDDING FOR EACH ROW.
 * - EITHER ADDS OR REMOVES odd_participant DEPENDING ON THE PARITY OF THE NUMBER OF PARTICIPANTS.
 * - ITERATES OVER vector_embedding AND PERFORMS GREEDY MATCHING ALGORITHM. 
 * - CLEARS ALL ROWS OF THE curr_matches TABLE.
 * - UPDATES THE curr_matches TABLE.
 * - APPENDS NEW MATCHES TO EACH ENTRY IN THE previous_matches TABLE.
 */
async function main() {
    // Generate vector embeddings for each participant in form_responses if not already.
    updateFormResponsesTableWithVectorEmbeddings();

    // Fetch all form_responses IDs
    const { data: participants, error: fetchErr } = await supabase
        .from('form_responses')
        .select('id')
        .order('id', { ascending: true });
    if (fetchErr) {
        console.error('Could not fetch form_responses:', fetchErr);
        process.exit(1);
    }
    if (!participants || participants.length < 2) {
        console.error('Need at least two form_responses rows');
        process.exit(1);
    }

    // If there is an odd number of participants, insert the odd_participant if not already there.
    // If the odd_participant is already there, removes it. 
    handleOddParticipant(participants);

    // Clear the curr_matches table of all matches. 
    clearCurrMatchesTable();

    // Match participants based on the cosine similarities of their vector embeddings. 
    const matches = await matchParticipants();

    // Populates the curr_matches table. 
    updateCurrMatches(matches);

    await fillEmojis();

    // Updates the previous_matches table. 
    updatePreviousMatches(matches);

}

main(); // run using node --loader ts-node/esm src/lib/matchmaker/match.ts
