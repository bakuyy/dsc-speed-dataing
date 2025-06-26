// M1. In class, I...
export const classSeatMap: Record<"a"|"b"|"c"|"d"|"e", string> = {
  a: "Sit in the front of class and try to absorb as much info as I can.",
  b: "Sit in the back and play Clash Royale.",
  c: "Sit somewhere in the middle, with my friends.",
  d: "I do not go to class ;-;",
  e: "Lowkey I be the professor bro."
};

// M2. Pick your favourite evil hobby...
export const evilHobbyMap: Record<"a"|"b"|"c"|"d"|"e", string> = {
  a: "Gossiping the latest tea",
  b: "Splurging money on (useless?) items",
  c: "Mukbanging food",
  d: "Entering a ranked match in Valorant",
  e: "Going down Wikipedia rabbit holes"
};

// M3. I am most likely to...
export const mostLikelyToMap: Record<"a"|"b"|"c"|"d"|"e", string> = {
  a: "Become a UW blogger on Instagram reels",
  b: "Eat a Lazeeza (Lazeez pizza)",
  c: "Disappear from campus and not tell anyone",
  d: "Sleep through a midterm",
  e: "Start a business"
};

// M4. You're most likely to catch me watching...
export const caughtWatchingMap: Record<"a"|"b"|"c"|"d"|"e", string> = {
  a: "Wooden soup ASMR",
  b: "1-hour mock SWE interview + solutions LEAKED!!!",
  c: "How to recover from a bad exam",
  d: "Can 100,000 Elephants defeat 1 MILLION Ostriches?",
  e: "How to make a matcha strawberry latte"
};

// List of MC Questions
// Passed to function getMCAnswer to get the answer of the MC Question from the choice [a, b, c, d, e]
export type MCQuestion = 
  | "class_seat" 
  | "evil_hobby" 
  | "most_likely_to" 
  | "caught_watching";

const multipleChoiceMaps: Record<MCQuestion, Record<"a"|"b"|"c"|"d"|"e", string>> = {
  class_seat:      classSeatMap,
  evil_hobby:      evilHobbyMap,
  most_likely_to:  mostLikelyToMap,
  caught_watching: caughtWatchingMap,
};

/**
 * Given the multiple choice question and the letter answer, return the string answer corresponding to the letter.
 * @param question The multiple choice question. Type MCQuestion. 
 * @param letter [a, b, c, d, e]
 * @returns string corresponding to the letter response of the multiple choice question. 
 */
export function getMCAnswer(question: MCQuestion, letter: "a"|"b"|"c"|"d"|"e"): string {
  return multipleChoiceMaps[question][letter];
}
