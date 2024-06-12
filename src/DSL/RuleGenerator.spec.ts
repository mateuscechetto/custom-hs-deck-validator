import "@testing-library/jest-dom";
import { generateRules } from "./RuleGenerator";
import { Rule, validateDeckString } from "./../DeckValidator";
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
} from "./../Card";

describe("Rule Generator", () => {
  const highlanderWarrior =
    "AAECAQcehqAEiaAEjtQEkNQE/cQFtPgFkPsFofsF2IEGhYIGkIMGyoMG0IMGko4GwpEGi5QG95cG6JgGnJ4Gn54GzZ4Gz54G0Z4Gh6AGx6QGk6gGr6gG7KkG0LAG5OYGAAABBqzRBf3EBdGeBv3EBYegBv3EBfSzBsekBvezBsekBujeBsekBgAA";
  const handbuffPala =
    "AAECAZ8FBtLOBebkBY3+BcekBtOpBubmBgzJoATLxAW4xQXYxgW5/gX4lAb4lQbOnAa0ngbQqQbRqQbJ9AYAAQPyswbHpAb1swbHpAbo3gbHpAYAAA==";

  const wildEggHunter =
    "AAEBAR8GuwX+rwLylgPjnwTlsATBuQQMxw+GwwKczQLTzQL2ugOeywON5AOU/AOpnwSqpAWQgwbopQYAAA==";

  describe("COPIES", () => {
    it("should generate Highlander Rule", () => {
      const highlanderRule: Rule = (_: Card, copies: number) => {
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
      const highlanderRule: Rule = (_: Card, copies: number) => {
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
        (card: Card, _: number) => {
          return card.set === Expansions.SHOWDOWN_BADLANDS;
        },
      ],
      [
        "IS NOT operator",
        "RULE EXPANSION IS NOT SHOWDOWN_BADLANDS",
        (card: Card, _: number) => {
          return card.set !== Expansions.SHOWDOWN_BADLANDS;
        },
      ],
      [
        "IN operator",
        "RULE EXPANSION IN SHOWDOWN_BADLANDS, CORE, WHIZBANGS_WORKSHOP",
        (card: Card, _: number) => {
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
        (card: Card, _: number) => {
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
        (card: Card, _: number) => {
          return STANDARD_EXPANSIONS.includes(card.set);
        },
      ],
      [
        "STANDARD value with IS NOT operator",
        "RULE EXPANSION IS NOT STANDARD",
        (card: Card, _: number) => {
          return !STANDARD_EXPANSIONS.includes(card.set);
        },
      ],
      [
        "STANDARD value with IN operator",
        "RULE EXPANSION IN STANDARD, THE_SUNKEN_CITY",
        (card: Card, _: number) => {
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
        (card: Card, _: number) => {
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
        (card: Card, _: number) => {
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
        (card: Card, _: number) => {
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
        (card: Card, _: number) => {
          return card.cardClass === HsClasses.NEUTRAL;
        },
      ],
      [
        "IS NOT operator",
        "RULE CLASS IS NOT NEUTRAL",
        (card: Card, _: number) => {
          return card.cardClass !== HsClasses.NEUTRAL;
        },
      ],
      [
        "IN operator",
        "RULE CLASS IN NEUTRAL, WARRIOR, HUNTER",
        (card: Card, _: number) => {
          const classes: HsClass[] = [
            HsClasses.NEUTRAL,
            HsClasses.WARRIOR,
            HsClasses.HUNTER,
          ];
          return classes.some(
            (c) => card.cardClass === c || !!card.classes?.includes(c)
          );
        },
      ],
      [
        "NOT IN operator",
        "RULE CLASS NOT IN NEUTRAL, HUNTER, WARRIOR",
        (card: Card, _: number) => {
          const classes: HsClass[] = [
            HsClasses.NEUTRAL,
            HsClasses.WARRIOR,
            HsClasses.HUNTER,
          ];

          return !classes.some(
            (c) => card.cardClass === c || !!card.classes?.includes(c)
          );
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
        (card: Card, _: number) => {
          return card.rarity === CardRarities.COMMON;
        },
      ],
      [
        "IS NOT operator",
        "RULE RARITY IS NOT COMMON",
        (card: Card, _: number) => {
          return card.rarity !== CardRarities.COMMON;
        },
      ],
      [
        "IN operator",
        "RULE RARITY IN COMMON, LEGENDARY",
        (card: Card, _: number) => {
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
        (card: Card, _: number) => {
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
        (card: Card, _: number) => {
          return card.type === CardTypes.MINION;
        },
      ],
      [
        "IS NOT operator",
        "RULE CARD_TYPE IS NOT MINION",
        (card: Card, _: number) => {
          return card.type !== CardTypes.MINION;
        },
      ],
      [
        "IN operator",
        "RULE CARD_TYPE IN MINION, SPELL",
        (card: Card, _: number) => {
          const cardTypes: CardType[] = [CardTypes.MINION, CardTypes.SPELL];

          return cardTypes.includes(card.type);
        },
      ],
      [
        "NOT IN operator",
        "RULE CARD_TYPE NOT IN MINION, SPELL",
        (card: Card, _: number) => {
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

  describe("COST", () => {
    it.each([
      [
        "IS operator",
        "RULE COST IS 1",
        (card: Card, _: number) => {
          return card.cost === 1;
        },
      ],
      [
        "IS NOT operator",
        "RULE COST IS NOT 1",
        (card: Card, _: number) => {
          return card.cost !== 1;
        },
      ],
      [
        "IN operator",
        "RULE COST IN 1, 2, 3, 4",
        (card: Card, _: number) => {
          const costs: number[] = [1, 2, 3, 4];
          return costs.includes(card.cost);
        },
      ],
      [
        "NOT IN operator",
        "RULE COST NOT IN 1, 2, 3, 4",
        (card: Card, _: number) => {
          const costs: number[] = [1, 2, 3, 4];
          return !costs.includes(card.cost);
        },
      ],
      [
        "ODD value with IS operator",
        "RULE COST IS ODD",
        (card: Card, _: number) => {
          return !!(card.cost & 1);
        },
      ],
      [
        "ODD value with IS NOT operator",
        "RULE COST IS NOT ODD",
        (card: Card, _: number) => {
          return !(card.cost & 1);
        },
      ],
      [
        "ODD value with IN operator",
        "RULE COST IN ODD, 2, 4",
        (card: Card, _: number) => {
          const costs = [2, 4];
          return costs.includes(card.cost) || !!(card.cost & 1);
        },
      ],
      [
        "ODD value with IN operator with ODD in later position",
        "RULE COST IN 2, 4, ODD",
        (card: Card, _: number) => {
          const costs = [2, 4];
          return costs.includes(card.cost) || !!(card.cost & 1);
        },
      ],
      [
        "ODD value with NOT IN operator",
        "RULE COST NOT IN ODD, 4",
        (card: Card, _: number) => {
          const costs = [4];
          return !(costs.includes(card.cost) || !!(card.cost & 1));
        },
      ],
      [
        "ODD value with NOT IN operator with standard in later position",
        "RULE COST NOT IN 4, 6, ODD",
        (card: Card, _: number) => {
          const costs = [4, 6];
          return !(costs.includes(card.cost) || !!(card.cost & 1));
        },
      ],
      [
        "EVEN value with IS operator",
        "RULE COST IS EVEN",
        (card: Card, _: number) => {
          return !(card.cost & 1);
        },
      ],
      [
        "EVEN value with IS NOT operator",
        "RULE COST IS NOT EVEN",
        (card: Card, _: number) => {
          return !!(card.cost & 1);
        },
      ],
      [
        "EVEN value with IN operator",
        "RULE COST IN EVEN, 3, 5",
        (card: Card, _: number) => {
          const costs = [3, 5];
          return costs.includes(card.cost) || !(card.cost & 1);
        },
      ],
      [
        "EVEN value with IN operator with EVEN in later position",
        "RULE COST IN 3, 5 EVEN",
        (card: Card, _: number) => {
          const costs = [3, 5];
          return costs.includes(card.cost) || !(card.cost & 1);
        },
      ],
      [
        "EVEN value with NOT IN operator",
        "RULE COST NOT IN EVEN, 3",
        (card: Card, _: number) => {
          const costs = [3];
          return !(costs.includes(card.cost) || !(card.cost & 1));
        },
      ],
      [
        "EVEN value with NOT IN operator with standard in later position",
        "RULE COST NOT IN 3, 5, EVEN",
        (card: Card, _: number) => {
          const costs = [3, 5];
          return !(costs.includes(card.cost) || !(card.cost & 1));
        },
      ],
      [
        "Less than with IS operator",
        "RULE COST IS <5",
        (card: Card, _: number) => {
          return card.cost < 5;
        },
      ],
      [
        "Less than with IS NOT operator",
        "RULE COST IS NOT <5",
        (card: Card, _: number) => {
          return card.cost >= 5;
        },
      ],
      [
        "Less than with IN operator",
        "RULE COST IN <3, 7, 8",
        (card: Card, _: number) => {
          const costs: number[] = [7, 8];
          return costs.includes(card.cost) || card.cost < 3;
        },
      ],
      [
        "Less than with NOT IN operator",
        "RULE COST NOT IN <3, 7, 8",
        (card: Card, _: number) => {
          const costs: number[] = [7, 8];
          return !(costs.includes(card.cost) || card.cost < 3);
        },
      ],
      [
        "More than with IS operator",
        "RULE COST IS >5",
        (card: Card, _: number) => {
          return card.cost > 5;
        },
      ],
      [
        "More than with IS NOT operator",
        "RULE COST IS NOT >5",
        (card: Card, _: number) => {
          return card.cost <= 5;
        },
      ],
      [
        "More than with IN operator",
        "RULE COST IN >5, 1, 2",
        (card: Card, _: number) => {
          const costs: number[] = [1, 2];
          return costs.includes(card.cost) || card.cost > 5;
        },
      ],
      [
        "More than with NOT IN operator",
        "RULE COST NOT IN >5, 1, 2",
        (card: Card, _: number) => {
          const costs: number[] = [1, 2];
          return !(costs.includes(card.cost) || card.cost > 5);
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
