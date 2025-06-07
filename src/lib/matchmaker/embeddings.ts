import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import { classSeatMap, evilHobbyMap, mostLikelyToMap, caughtWatchingMap } from "./multipleChoiceMap";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

export async function generateEmbeddings(): Promise<
  { participant: Participant; embedding: number[] }[]
> {
  const filePath = path.join(process.cwd(), "src", "data", "participants.json");
  const fileContents = readFileSync(filePath, "utf-8");
  const participants: Participant[] = JSON.parse(fileContents);

  const results = [];

  for (const person of participants) {
    const input = [
      person.email,
      person.name,
      person.pronouns,
      person.program,
      person.year,
      person.social_media_links,
      person.career,
      person.friend_traits,
      person.self_desc,
      person.goal,
      person.fun,
      person.music,
      classSeatMap[person.class_seat],
      evilHobbyMap[person.evil_hobby],
      mostLikelyToMap[person.most_likely_to],
      caughtWatchingMap[person.caught_watching]
    ].join("\n");
    
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input
    });

    const embedding = embeddingResponse.data[0].embedding;
    results.push({ participant: person, embedding });
  }

  return results;
}
