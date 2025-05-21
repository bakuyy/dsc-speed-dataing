import { generateEmbeddings } from "./embeddings.js";
import { cosineSimilarity } from "./similarity.js";

interface MatchResult {
  pair: [string, string];
  score: number;
}

export async function runMatching(): Promise<MatchResult[]> {
  const embedded = await generateEmbeddings();

  const unmatched = new Set(embedded.map(e => e.participant.id));
  const matches: MatchResult[] = [];

  while (unmatched.size >= 2) {
    let bestPair: MatchResult | null = null;
    const arr = Array.from(unmatched);

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const p1 = embedded.find(p => p.participant.id === arr[i])!;
        const p2 = embedded.find(p => p.participant.id === arr[j])!;
        const score = cosineSimilarity(p1.embedding, p2.embedding);

        if (!bestPair || score > bestPair.score) {
          bestPair = { pair: [p1.participant.id, p2.participant.id], score };
        }
      }
    }

    if (bestPair) {
      matches.push(bestPair);
      unmatched.delete(bestPair.pair[0]);
      unmatched.delete(bestPair.pair[1]);
    }
  }

  return matches;
}
