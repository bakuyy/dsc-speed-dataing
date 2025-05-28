import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pronouns: string;
  program: string;
  schoolLevel: string; // "1A" to "4B"

  responses: {
    // Open-ended
    career: string;
    friendTraits: string;
    selfDescription: string;
    goalForEvent: string;
    interests: string;
    musicTaste: string;

    // Multiple-choice (a, b, c, d, e)
    inClass: string;
    evilHobby: string;
    mostLikelyTo: string;
  };
}

export async function generateEmbeddings(): Promise<
  { participant: Participant; embedding: number[] }[]
> {
  const filePath = path.join(process.cwd(), "src", "data", "participants.json");
  const fileContents = readFileSync(filePath, "utf-8");
  const participants: Participant[] = JSON.parse(fileContents);

  const results = [];

  for (const person of participants) {
    const input = Object.values(person.responses).join("\n");

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input
    });

    const embedding = embeddingResponse.data[0].embedding;
    results.push({ participant: person, embedding });
  }

  return results;
}
