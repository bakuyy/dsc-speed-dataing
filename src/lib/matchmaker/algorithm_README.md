# Developer Notes on the Matchmaking Algorithm

Hi this is Lydia and I made the matchmaking algorithm and I will explain a few things here. 

## Supabase Tables

There are 3 tables pulled from and written to:

1. **form_responses**: All responses from the form. Length is number of participants. 

2. **curr_matches**: The current matches (this round)! Table will be cleared and repopulated each time match.ts is run. 

3. **prev_matches**: All previous matches per participant. Length is number of participants.

## OpenAI Vector Embeddings

The model 'text-embedding-3-small' was used for minimal computation. 

## Odd number of participants

*Goal*: 
Pair everyone up

*Issue*: 
If there is an odd number of participants, someone will be alone.

*Fix*: 
A hard-coded participant structure called odd_participant will be inserted or removed depending on the parity. This will be named one of the execs who will be at the event, and will pair up with the least pairable (2k+1)th participant. 

*Procedure*:
If there is an odd number of participants and odd_participant is not yet inserted, insert them into the form_responses table to save the day. 
If there is an odd number of participants and odd_participant is already one of them, remove them. 

*What to change each term*:
Since each term has different execs, simply change the name field of the odd_participant to an exec who will be at the event. 
Do NOT change the vector_embedding field, it will be costly to recalculate each time. We can hand-wave this pair, it doesn't have to be perfect.
