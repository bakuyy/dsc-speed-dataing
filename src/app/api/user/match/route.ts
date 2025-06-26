import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  
  if (!token) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  try {
    console.log('[User Match API] Fetching user match...');

    // Get user email from external API using token
    const { data: userData } = await axios.get(
      `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/user`,
      {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 4000,
      }
    );

    const userEmail = userData.email;
    console.log('[User Match API] User email from external API:', userEmail);

    // Find the user's form response ID (UUID)
    const { data: userFormData, error: userError } = await supabase
      .from('form_responses')
      .select('id')
      .ilike('email', userEmail)
      .single();

    if (userError || !userFormData) {
      console.error('[User Match API] User not found in form_responses:', userError);
      return NextResponse.json({ 
        error: "User not found in form responses. Please submit the form first.",
        userEmail: userEmail 
      }, { status: 404 });
    }

    const userUUID = userFormData.id;
    console.log('[User Match API] User UUID from form_responses:', userUUID);

    // Find the user's match using UUIDs
    const { data: match, error: matchError } = await supabase
      .from('curr_matches')
      .select('*')
      .or(`person1_id.eq.${userUUID},person2_id.eq.${userUUID}`)
      .single();

    if (matchError) {
      if (matchError.code === 'PGRST116') { // No rows found
        return NextResponse.json({ 
          success: true,
          message: "No match found yet",
          match: null 
        });
      } else {
        console.error('[User Match API] Error fetching match:', matchError);
        return NextResponse.json({ error: "Failed to fetch match" }, { status: 500 });
      }
    }

    if (!match) {
      return NextResponse.json({ 
        success: true,
        message: "No match found yet",
        match: null 
      });
    }

    // Determine the matched person's UUID
    const matchedPersonUUID = match.person1_id === userUUID ? match.person2_id : match.person1_id;
    console.log('[User Match API] Matched person UUID:', matchedPersonUUID);

    // Fetch the matched person's comprehensive details using UUID
    const { data: matchedPerson, error: personError } = await supabase
      .from('form_responses')
      .select(`
        name,
        email,
        pronouns,
        program,
        year,
        social_media_links,
        career,
        friend_traits,
        self_desc,
        goal,
        fun,
        music,
        class_seat,
        evil_hobby,
        most_likely_to,
        caught_watching
      `)
      .eq('id', matchedPersonUUID)
      .single();

    if (personError) {
      console.error('[User Match API] Error fetching matched person:', personError);
      return NextResponse.json({ error: "Failed to fetch match details" }, { status: 500 });
    }

    const matchData = {
      emoji: match.emoji,
      similarity_score: match.similarity_score,
      matched_person: {
        name: matchedPerson.name,
        email: matchedPerson.email,
        pronouns: matchedPerson.pronouns,
        program: matchedPerson.program,
        year: matchedPerson.year,
        social_media_links: matchedPerson.social_media_links,
        career: matchedPerson.career,
        friend_traits: matchedPerson.friend_traits,
        self_desc: matchedPerson.self_desc,
        goal: matchedPerson.goal,
        fun: matchedPerson.fun,
        music: matchedPerson.music,
        class_seat: matchedPerson.class_seat,
        evil_hobby: matchedPerson.evil_hobby,
        most_likely_to: matchedPerson.most_likely_to,
        caught_watching: matchedPerson.caught_watching
      }
    };

    console.log('[User Match API] Successfully fetched user match with full details');

    return NextResponse.json({
      success: true,
      message: "Match found",
      match: matchData
    });

  } catch (error) {
    console.error('[User Match API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 