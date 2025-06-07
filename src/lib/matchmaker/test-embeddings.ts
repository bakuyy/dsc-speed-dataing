import { generateEmbeddings } from "./embeddings.js";

async function test() {
  const results = await generateEmbeddings();
  for (const { participant, embedding } of results) {
    console.log(
      `${participant.name} : ${embedding.slice(
        0,
        5
      ).map(n => n.toFixed(2))}...`
    );
  }
}

test();
