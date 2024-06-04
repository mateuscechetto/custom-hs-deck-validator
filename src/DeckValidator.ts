import { decode } from "deckstrings";
import cards from "./resources/cards.collectible.json"; // https://api.hearthstonejson.com/v1/192896/enUS/cards.collectible.json
import { Card, HsClass, heroIdToClass } from "./Card";

export type Rule = (card: Card, copies: number, deckClass: HsClass) => boolean;

export type CardAndCopies = {
  cardObject: Card;
  copies: number;
};

export const validateDeckString = (
  deckString: string,
  rules: Rule[]
): CardAndCopies[] => {
  let deck;

  try {
    deck = decode(deckString);
  } catch (err) {
    console.log("error on decoding deckstring", err);
    // TODO: Handle errors
    return [];
  }

  const deckClass = heroIdToClass(deck.heroes[0]);

  const deckCards = deck.cards.map(([id, copies]) => {
    const cardObject: Card = cards.find((c) => c.dbfId === id);
    return { cardObject, copies };
  });

  // TODO: add sideboard logic

  const invalidCards = new Set<CardAndCopies>();

  rules.forEach((rule) => {
    const invalidedByRule = deckCards.filter(
      ({ cardObject, copies }) => !rule(cardObject, copies, deckClass)
    );
    invalidedByRule.forEach((c) => invalidCards.add(c));
  });

  return Array.from(invalidCards);
};
