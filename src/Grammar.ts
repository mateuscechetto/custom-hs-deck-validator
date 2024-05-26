import { CardRarities, CardTypes, Expansions, HsClasses } from "./Card";

// Expression examples
// RULE EXPANSION IS SHOWDOWN_BADLANDS
// RULE EXPANSION IS NOT SHOWDOWN_BADLANDS
// RULE EXPANSION IN SHOWDOWN_BADLANDS, THE_SUNKEN_CITY
// RULE EXPANSION NOT IN SHOWDOWN_BADLANDS, THE_SUNKEN_CITY
// RULE COPIES IS 1
// RULE CLASS NOT IN NEUTRAL

export const rule = ["RULE"];
export const attributes = [
  "EXPANSION",
  "CLASS",
  "RARITY",
  "CARD_TYPE",
  "COPIES",
];
export const operators = ["IN", "IS"];
export const not = ["NOT"];
export const hsValues = [
    ...Object.keys(Expansions),
  ...Object.values(HsClasses),
  ...Object.values(CardRarities),
  ...Object.values(CardTypes),
  "STANDARD"
];
