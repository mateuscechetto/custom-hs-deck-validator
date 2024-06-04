import "@testing-library/jest-dom";
import { generateRules } from "./RuleGenerator";
import { Rule, validateDeckString } from "./DeckValidator";
import {
  Card,
  CardRarities,
  CardRarity,
  CardType,
  CardTypes,
  Expansion,
  Expansions,
  HsClass,
  HsClasses,
  STANDARD_EXPANSIONS,
} from "./Card";

describe("Rule Generator", () => {
  const highlanderWarrior =
    "AAECAQcehqAEiaAEjtQEkNQE/cQFtPgFkPsFofsF2IEGhYIGkIMGyoMG0IMGko4GwpEGi5QG95cG6JgGnJ4Gn54GzZ4Gz54G0Z4Gh6AGx6QGk6gGr6gG7KkG0LAG5OYGAAABBqzRBf3EBdGeBv3EBYegBv3EBfSzBsekBvezBsekBujeBsekBgAA";
  const handbuffPala =
    "AAECAZ8FBtLOBebkBY3+BcekBtOpBubmBgzJoATLxAW4xQXYxgW5/gX4lAb4lQbOnAa0ngbQqQbRqQbJ9AYAAQPyswbHpAb1swbHpAbo3gbHpAYAAA==";

  const wildEggHunter =
    "AAEBAR8GuwX+rwLylgPjnwTlsATBuQQMxw+GwwKczQLTzQL2ugOeywON5AOU/AOpnwSqpAWQgwbopQYAAA==";

  describe("COPIES", () => {
    it("should generate Highlander Rule", () => {
      const highlanderRule: Rule = (_: Card, copies: number, __: HsClass) => {
        return copies === 1;
      };

      const hlResult = generateRules("RULE COPIES IS 1");

      expect(validateDeckString(highlanderWarrior, hlResult)).toEqual(
        validateDeckString(highlanderWarrior, [highlanderRule])
      );

      expect(validateDeckString(handbuffPala, hlResult)).toEqual(
        validateDeckString(handbuffPala, [highlanderRule])
      );

      expect(validateDeckString(wildEggHunter, hlResult)).toEqual(
        validateDeckString(wildEggHunter, [highlanderRule])
      );
    });

    it("should generate Rule with IS NOT operator", () => {
      const highlanderRule: Rule = (_: Card, copies: number, __: HsClass) => {
        return copies === 1;
      };

      const hlResult = generateRules("RULE COPIES IS NOT 2");

      expect(validateDeckString(highlanderWarrior, hlResult)).toEqual(
        validateDeckString(highlanderWarrior, [highlanderRule])
      );

      expect(validateDeckString(handbuffPala, hlResult)).toEqual(
        validateDeckString(handbuffPala, [highlanderRule])
      );

      expect(validateDeckString(wildEggHunter, hlResult)).toEqual(
        validateDeckString(wildEggHunter, [highlanderRule])
      );
    });
  });

  describe("EXPANSION", () => {
    it.each([
      [
        "IS operator",
        "RULE EXPANSION IS SHOWDOWN_BADLANDS",
        (card: Card, _: number, __: HsClass) => {
          return card.set === Expansions.SHOWDOWN_BADLANDS;
        },
      ],
      [
        "IS NOT operator",
        "RULE EXPANSION IS NOT SHOWDOWN_BADLANDS",
        (card: Card, _: number, __: HsClass) => {
          return card.set !== Expansions.SHOWDOWN_BADLANDS;
        },
      ],
      [
        "IN operator",
        "RULE EXPANSION IN SHOWDOWN_BADLANDS, CORE, WHIZBANGS_WORKSHOP",
        (card: Card, _: number, __: HsClass) => {
          const expansions: Expansion[] = [
            Expansions.SHOWDOWN_BADLANDS,
            Expansions.CORE,
            Expansions.WHIZBANGS_WORKSHOP,
          ];

          return expansions.includes(card.set);
        },
      ],
      [
        "NOT IN operator",
        "RULE EXPANSION NOT IN SHOWDOWN_BADLANDS, CORE, WHIZBANGS_WORKSHOP",
        (card: Card, _: number, __: HsClass) => {
          const expansions: Expansion[] = [
            Expansions.SHOWDOWN_BADLANDS,
            Expansions.CORE,
            Expansions.WHIZBANGS_WORKSHOP,
          ];

          return !expansions.includes(card.set);
        },
      ],
      [
        "STANDARD value with IS operator",
        "RULE EXPANSION IS STANDARD",
        (card: Card, _: number, __: HsClass) => {
          return STANDARD_EXPANSIONS.includes(card.set);
        },
      ],
      [
        "STANDARD value with IS NOT operator",
        "RULE EXPANSION IS NOT STANDARD",
        (card: Card, _: number, __: HsClass) => {
          return !STANDARD_EXPANSIONS.includes(card.set);
        },
      ],
      [
        "STANDARD value with IN operator",
        "RULE EXPANSION IN STANDARD, THE_SUNKEN_CITY",
        (card: Card, _: number, __: HsClass) => {
          const expansions = [
            ...STANDARD_EXPANSIONS,
            Expansions.THE_SUNKEN_CITY,
          ];
          return expansions.includes(card.set);
        },
      ],
      [
        "STANDARD value with IN operator with standard in later position",
        "RULE EXPANSION IN THE_SUNKEN_CITY, STANDARD",
        (card: Card, _: number, __: HsClass) => {
          const expansions = [
            ...STANDARD_EXPANSIONS,
            Expansions.THE_SUNKEN_CITY,
          ];
          return expansions.includes(card.set);
        },
      ],
      [
        "STANDARD value with NOT IN operator",
        "RULE EXPANSION NOT IN STANDARD, THE_SUNKEN_CITY",
        (card: Card, _: number, __: HsClass) => {
          const expansions = [
            ...STANDARD_EXPANSIONS,
            Expansions.THE_SUNKEN_CITY,
          ];
          return !expansions.includes(card.set);
        },
      ],
      [
        "STANDARD value with NOT IN operator with standard in later position",
        "RULE EXPANSION NOT IN THE_SUNKEN_CITY, STANDARD",
        (card: Card, _: number, __: HsClass) => {
          const expansions = [
            ...STANDARD_EXPANSIONS,
            Expansions.THE_SUNKEN_CITY,
          ];
          return !expansions.includes(card.set);
        },
      ],
    ])("should generate RULE with %o", (_, input, expectedRule) => {
      const result = generateRules(input);

      expect(validateDeckString(highlanderWarrior, result)).toEqual(
        validateDeckString(highlanderWarrior, [expectedRule])
      );

      expect(validateDeckString(handbuffPala, result)).toEqual(
        validateDeckString(handbuffPala, [expectedRule])
      );

      expect(validateDeckString(wildEggHunter, result)).toEqual(
        validateDeckString(wildEggHunter, [expectedRule])
      );
    });
  });

  describe("CLASS", () => {
    it.each([
      [
        "IS operator",
        "RULE CLASS IS NEUTRAL",
        (card: Card, _: number, __: HsClass) => {
          return card.cardClass === HsClasses.NEUTRAL;
        },
      ],
      [
        "IS NOT operator",
        "RULE CLASS IS NOT NEUTRAL",
        (card: Card, _: number, __: HsClass) => {
          return card.cardClass !== HsClasses.NEUTRAL;
        },
      ],
      [
        "IN operator",
        "RULE CLASS IN NEUTRAL, WARRIOR, HUNTER",
        (card: Card, _: number, __: HsClass) => {
          const classes: HsClass[] = [
            HsClasses.NEUTRAL,
            HsClasses.WARRIOR,
            HsClasses.HUNTER,
          ];

          return classes.includes(card.cardClass);
        },
      ],
      [
        "NOT IN operator",
        "RULE CLASS NOT IN NEUTRAL, HUNTER, WARRIOR",
        (card: Card, _: number, __: HsClass) => {
          const classes: HsClass[] = [
            HsClasses.NEUTRAL,
            HsClasses.WARRIOR,
            HsClasses.HUNTER,
          ];

          return !classes.includes(card.cardClass);
        },
      ],
    ])("should generate RULE with %o", (_, input, expectedRule) => {
      const result = generateRules(input);

      expect(validateDeckString(highlanderWarrior, result)).toEqual(
        validateDeckString(highlanderWarrior, [expectedRule])
      );

      expect(validateDeckString(handbuffPala, result)).toEqual(
        validateDeckString(handbuffPala, [expectedRule])
      );

      expect(validateDeckString(wildEggHunter, result)).toEqual(
        validateDeckString(wildEggHunter, [expectedRule])
      );
    });
  });

  describe("RARITY", () => {
    it.each([
      [
        "IS operator",
        "RULE RARITY IS COMMON",
        (card: Card, _: number, __: HsClass) => {
          return card.rarity === CardRarities.COMMON;
        },
      ],
      [
        "IS NOT operator",
        "RULE RARITY IS NOT COMMON",
        (card: Card, _: number, __: HsClass) => {
          return card.rarity !== CardRarities.COMMON;
        },
      ],
      [
        "IN operator",
        "RULE RARITY IN COMMON, LEGENDARY",
        (card: Card, _: number, __: HsClass) => {
          const rarities: CardRarity[] = [
            CardRarities.COMMON,
            CardRarities.LEGENDARY,
          ];

          return rarities.includes(card.rarity);
        },
      ],
      [
        "NOT IN operator",
        "RULE RARITY NOT IN COMMON, LEGENDARY",
        (card: Card, _: number, __: HsClass) => {
          const rarities: CardRarity[] = [
            CardRarities.COMMON,
            CardRarities.LEGENDARY,
          ];
          return !rarities.includes(card.rarity);
        },
      ],
    ])("should generate RULE with %o", (_, input, expectedRule) => {
      const result = generateRules(input);

      expect(validateDeckString(highlanderWarrior, result)).toEqual(
        validateDeckString(highlanderWarrior, [expectedRule])
      );

      expect(validateDeckString(handbuffPala, result)).toEqual(
        validateDeckString(handbuffPala, [expectedRule])
      );

      expect(validateDeckString(wildEggHunter, result)).toEqual(
        validateDeckString(wildEggHunter, [expectedRule])
      );
    });
  });

  describe("CARD_TYPE", () => {
    it.each([
      [
        "IS operator",
        "RULE CARD_TYPE IS MINION",
        (card: Card, _: number, __: HsClass) => {
          return card.type === CardTypes.MINION;
        },
      ],
      [
        "IS NOT operator",
        "RULE CARD_TYPE IS NOT MINION",
        (card: Card, _: number, __: HsClass) => {
          return card.type !== CardTypes.MINION;
        },
      ],
      [
        "IN operator",
        "RULE CARD_TYPE IN MINION, SPELL",
        (card: Card, _: number, __: HsClass) => {
          const cardTypes: CardType[] = [CardTypes.MINION, CardTypes.SPELL];

          return cardTypes.includes(card.type);
        },
      ],
      [
        "NOT IN operator",
        "RULE CARD_TYPE NOT IN MINION, SPELL",
        (card: Card, _: number, __: HsClass) => {
          const cardTypes: CardType[] = [CardTypes.MINION, CardTypes.SPELL];
          return !cardTypes.includes(card.type);
        },
      ],
    ])("should generate RULE with %o", (_, input, expectedRule) => {
      const result = generateRules(input);

      expect(validateDeckString(highlanderWarrior, result)).toEqual(
        validateDeckString(highlanderWarrior, [expectedRule])
      );

      expect(validateDeckString(handbuffPala, result)).toEqual(
        validateDeckString(handbuffPala, [expectedRule])
      );

      expect(validateDeckString(wildEggHunter, result)).toEqual(
        validateDeckString(wildEggHunter, [expectedRule])
      );
    });
  });
});
