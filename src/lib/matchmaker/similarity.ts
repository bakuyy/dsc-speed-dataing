/**
 * This function calculates the cosine similarity between two vectors a and b, defined as:
 * cosineSimilarity(a, b) = \frac{a \cdot b}{|a| \cdot |b|}
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dotProduct / (normA * normB);
}
