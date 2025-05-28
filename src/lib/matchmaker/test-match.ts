import { runMatching } from "./match.js";
import fs from "fs";
import path from "path";

// Define the shape of a participant (hard coded from embeddings.ts)
interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pronouns: string;
  program: string;
  schoolLevel: string;
  responses: {
    career: string;
    friendTraits: string;
    selfDescription: string;
    goalForEvent: string;
    interests: string;
    musicTaste: string;
    inClass: string;
    evilHobby: string;
    mostLikelyTo: string;
  };
}

async function test() {
  const matches = await runMatching();

  const filePath = path.join(process.cwd(), "src", "data", "participants.json");
  const participants: Participant[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const nameFromId = (id: string): string => {
    const p = participants.find((p: Participant) => p.id === id);
    return p ? `${p.firstName} ${p.lastName}` : "Unknown";
  };

  for (const { pair, score } of matches) {
    console.log(`Match: ${nameFromId(pair[0])} with ${nameFromId(pair[1])} (score: ${score.toFixed(4)})`);
  }
}

test();
