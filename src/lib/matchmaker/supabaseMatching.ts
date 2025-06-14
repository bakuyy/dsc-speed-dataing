import { supabase } from "@/lib/supabase";
import { generateEmbeddings } from "./embeddings.js";
import { runMatching } from "./match.js";
import blossom from 'edmonds-blossom' // npm install edmonds-blossom
                                      // npm install --save-dev @types/edmonds-blossom || echo "No types available, using as any"

interface Participant {
  // Basic info
  email: string;
  name: string;
  pronouns: string;
  program: string;
  year: string;
  social_media_links: string;
  // Open-ended responses
  // Career
  career: string;
  // Friendship
  friend_traits: string;
  self_desc: string;
  goal: string;
  // Interests
  fun: string;
  music: string;
  // Multiple choice: [a, b, c, d, e]
  class_seat: "a" | "b" | "c" | "d" | "e";
  evil_hobby: "a" | "b" | "c" | "d" | "e";
  most_likely_to: "a" | "b" | "c" | "d" | "e";
  caught_watching: "a" | "b" | "c" | "d" | "e";
}

/**
 * Get all rows from form_responses table in Supabase, map them to Participant objects, and log each to the console.
 *
 * @returns {Promise<void>}
 */
export async function getFormResponses() {
  const { data, error } = await supabase
    .from("form_responses")
    .select(`
      email,
      name,
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
    `);

  if (error) {
    console.error("Error fetching form responses:", error);
    return;
  }

  data.forEach(row => {
    const participant = {
      email: row.email,
      name: row.name,
      pronouns: row.pronouns,
      program: row.program,
      year: row.year,
      social_media_links: row.social_media_links,
      career: row.career,
      friend_traits: row.friend_traits,
      self_desc: row.self_desc,
      goal: row.goal,
      fun: row.fun,
      music: row.music,
      class_seat: row.class_seat,
      evil_hobby: row.evil_hobby,
      most_likely_to: row.most_likely_to,
      caught_watching: row.caught_watching,
    };
    console.log(participant);
  });
}


