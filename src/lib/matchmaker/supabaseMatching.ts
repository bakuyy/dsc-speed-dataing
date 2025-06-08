import { supabase } from "@/lib/supabase";
import { generateEmbeddings } from "./embeddings.js";
import { runMatching } from "./match.js";

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
  // Not a question, but used for embeddings. This is the output of the OpenAI embeddings API.
  vector_embedding?: number[];
}

async function runMatchingAlgorithm() {
  const { data: participants, error } = await supabase
    .from("form_responses")
    .select("*");

  if (error || !participants) {
    console.error("Failed to fetch form responses:", error);
    return;
  }

  // Transform to expected structure
  const formatted = participants.map((p) => ({
    ...p,
    email: "", // not stored in DB, but embedding input might expect it
  }));

  // Inject into matchmaker
  const embeddings = await generateEmbeddings(formatted);
  const matches = await runMatching(embeddings.map(e => e));

  for (const { p1, p2, emoji, reach } of matches) {
    const { error: insertError } = await supabase.from("matches").insert({
        person1_id: p1.email,
        person2_id: p2.email,
        person1_name: p1.name,
        person2_name: p2.name,
        person1_program: p1.program,
        person2_program: p2.program,
        person1_year: p1.year,
        person2_year: p2.year,
        person1_socials: p1.social_media_links,
        person2_socials: p2.social_media_links,
        person1_pronouns: p1.pronouns,
        person2_pronouns: p2.pronouns,
        emoji,
        reach
    });

    if (insertError) {
        console.error(`Failed to insert match between ${p1.name} and ${p2.name}:`, insertError);
    }
  }

  console.log("Matching complete!");
}

runMatchingAlgorithm();
