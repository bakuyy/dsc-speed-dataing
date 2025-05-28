import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import { classBehaviorMap, evilHobbyMap } from "./mappings.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface Participant {
  name: {
    first: string;
    last: string;
  };
  email: string;
  pronouns: string;
  program: string;
  year: string;

  career: string;
  friend_traits: string[];
  self_description: string;
  goal: string;
  fun: string[];
  music: {
    genre: string;
    artists: string[];
  };

  class_behavior: string;
  evil_hobby: string;
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
      person.career,
      person.friend_traits.join(", "),
      person.self_description,
      person.goal,
      person.fun.join(", "),
      person.music.genre,
      person.music.artists.join(", "),
      classBehaviorMap[person.class_behavior],
      evilHobbyMap[person.evil_hobby]
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
