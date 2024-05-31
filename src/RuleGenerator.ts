import { Rule } from "./DeckValidator";

export const createRule = (input: string): Rule => {
  return () => true;
};
