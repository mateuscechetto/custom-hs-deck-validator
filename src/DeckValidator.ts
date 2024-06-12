import { decode } from "deckstrings";
import cards from "./resources/cards.collectible.json"; // https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json
import { Card } from "./Card";

export type Rule = (card: Card, copies: number) => boolean;

export type CardAndCopies = {
  cardObject: Card;
  copies: number;
};

/** 
 * @throws {Error} When the deckstring is not decodable
 */
export const validateDeckString = (
  deckString: string,
  rules: Rule[]
): CardAndCopies[] => {
  let deck;

  deck = decode(deckString);

  const deckCards = deck.cards.map(([id, copies]) => {
    const cardObject: Card = cards.find((c) => c.dbfId === id);
    return { cardObject, copies };
  });

  // TODO: add sideboard logic

  const invalidCards = new Set<CardAndCopies>();

  rules.forEach((rule) => {
    const invalidedByRule = deckCards.filter(
      ({ cardObject, copies }) => !rule(cardObject, copies)
    );
    invalidedByRule.forEach((c) => invalidCards.add(c));
  });

  return Array.from(invalidCards);
};
