import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    console.log('[Form Submit API] Processing form submission...');
    
    // Check if form is active
    const { data: sessionState, error: sessionError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'session_state')
      .single();

    if (sessionError) {
      console.error('[Form Submit API] Error checking session state:', sessionError);
      return NextResponse.json({ error: "Failed to check form status" }, { status: 500 });
    }

    if (sessionState?.value !== 'form_active') {
      console.log('[Form Submit API] Form submission rejected - form not active:', sessionState?.value);
      return NextResponse.json({ 
        error: "Form is not currently active",
        sessionState: sessionState?.value 
      }, { status: 403 });
    }

    // Get form data
    const formData = await request.json();
    console.log('[Form Submit API] Form data received:', formData);

    // Validate required fields
    const requiredFields = ['name', 'watiam_user_display', 'program', 'year'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
    
    if (missingFields.length > 0) {
      console.log('[Form Submit API] Missing required fields:', missingFields);
      return NextResponse.json({ 
        error: "Missing required fields", 
        missingFields 
      }, { status: 400 });
    }

    // Check if user has already submitted (using watiam_user field)
    const { data: existingSubmission, error: checkError } = await supabase
      .from('form_responses')
      .select('id')
      .eq('watiam_user', formData.watiam_user_display)
      .single();

    if (existingSubmission && !checkError) {
      console.log('[Form Submit API] User has already submitted:', formData.watiam_user_display);
      return NextResponse.json({ 
        error: "You have already submitted a response",
        message: "Only one submission per user is allowed"
      }, { status: 409 });
    }

    // Prepare data for insertion - map to actual database columns
    const submissionData = {
      name: formData.name.trim(),
      pronouns: formData.pronouns || null,
      watiam_user: formData.watiam_user_display.trim(), // Map to watiam_user column
      program: formData.program.trim(),
      year: formData.year.trim(),
      social_media_links: formData.social_media_links?.trim() || null,
      career: formData.career?.trim() || null,
      friend_traits: formData.friend_traits?.trim() || null,
      self_desc: formData.self_desc?.trim() || null,
      goal: formData.goal?.trim() || null,
      fun: formData.fun?.trim() || null,
      music: formData.music?.trim() || null,
      class_seat: formData.class_seat || null,
      evil_hobby: formData.evil_hobby || null,
      most_likely_to: formData.most_likely_to || null,
      caught_watching: formData.caught_watching || null
    };

    console.log('[Form Submit API] Inserting submission data:', submissionData);

    // Insert into database
    const { data, error } = await supabase
      .from('form_responses')
      .insert(submissionData)
      .select();

    if (error) {
      console.error('[Form Submit API] Error inserting form response:', error);
      
      // Handle specific constraint violations
      if (error.code === '23505') {
        if (error.message.includes('unique_watiam_user')) {
          return NextResponse.json({ 
            error: "You have already submitted a response",
            message: "Only one submission per user is allowed"
          }, { status: 409 });
        }
        if (error.message.includes('form_responses_name_key')) {
          return NextResponse.json({ 
            error: "A response with this name already exists",
            message: "Please use a different name or contact support"
          }, { status: 409 });
        }
      }
      
      // Handle length constraint violations
      if (error.code === '23514') {
        const fieldMap: { [key: string]: string } = {
          'form_responses_music_genre_check': 'music',
          'form_responses_career_check': 'career',
          'form_responses_what_to_gain_check': 'goal',
          'form_responses_year_check': 'year',
          'form_responses_description_check': 'self_desc',
          'form_responses_friend_traits_check': 'friend_traits',
          'form_responses_fun_hobbies_check': 'fun'
        };
        
        for (const [constraint, field] of Object.entries(fieldMap)) {
          if (error.message.includes(constraint)) {
            return NextResponse.json({ 
              error: `${field} is too long`,
              message: `Please keep your ${field} response under 500 characters`
            }, { status: 400 });
          }
        }
      }
      
      return NextResponse.json({ error: "Failed to save form response" }, { status: 500 });
    }

    console.log('[Form Submit API] Form submission successful:', data);
    
    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully!",
      submissionId: data?.[0]?.id
    });

  } catch (error) {
    console.error('[Form Submit API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 