import { runMatching } from "./match.js";
import fs from "fs";
import path from "path";

interface Participant {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

async function test() {
  const matches = await runMatching();

  const filePath = path.join(process.cwd(), "src", "data", "participants.json");
  const participants: Participant[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const nameFromEmail = (email: string): string => {
    const p = participants.find(p => p.email === email);
    return p ? `${p.name.first} ${p.name.last}` : "Unknown";
  };

  for (const { pair, score } of matches) {
    console.log(`🔗 ${nameFromEmail(pair[0])} ↔ ${nameFromEmail(pair[1])} (score: ${score.toFixed(4)})`);
  }
}

test();
