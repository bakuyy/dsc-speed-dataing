import { generateEmbeddings } from "./embeddings.js";
import { cosineSimilarity } from "./similarity.js";

interface MatchResult {
  p1: Participant;
  p2: Participant;
  score: number;
  emoji: string;
  reach: string;
}

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

export async function runMatching(
  participants: Participant[]
): Promise<MatchResult[]> {
  const embedded = await generateEmbeddings(participants);

  const unmatched = new Set(embedded.map(p => p.email));
  const matches: MatchResult[] = [];

  while (unmatched.size >= 2) {
    let bestPair: MatchResult | null = null;
    const arr = Array.from(unmatched);

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const p1 = embedded.find(p => p.email === arr[i])!;
        const p2 = embedded.find(p => p.email === arr[j])!;
        const score = cosineSimilarity(
          p1.vector_embedding!,
          p2.vector_embedding!
        );

        if (!bestPair || score > bestPair.score) {
          bestPair = {
            p1,
            p2,
            score,
            emoji: "💞", // hardcoding for nwo
            reach: `Matched based on similar traits in ${p1.friend_traits.split(" ")[0]} and ${p2.friend_traits.split(" ")[0]}`
          };
        }
      }
    }

    if (bestPair) {
      matches.push(bestPair);
      unmatched.delete(bestPair.p1.email);
      unmatched.delete(bestPair.p2.email);
    }
  }

  return matches;
}
