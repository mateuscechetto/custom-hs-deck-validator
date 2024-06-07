import "@testing-library/jest-dom";
import { validateInput } from "./RuleValidator";

describe("Rule Validator", () => {
  describe("Correct inputs", () => {
    it.each([
      ["single line IS", `RULE RARITY IS RARE`],
      ["single line IS NOT", `RULE RARITY IS NOT RARE`],
      ["single line IN with 1 parameter", `RULE RARITY IN RARE`],
      ["single line NOT IN with 1 parameter", `RULE RARITY NOT IN RARE`],
      [
        "single line NOT IN with multiple parameters",
        `RULE RARITY NOT IN RARE COMMON`,
      ],
      [
        "single line NOT IN with multiple parameters with commas",
        `RULE RARITY NOT IN RARE, COMMON`,
      ],
      [
        "multi line",
        `RULE RARITY NOT IN RARE, COMMON\r\n
        RULE RARITY IS RARE`,
      ],
      [
        "multi line with empty lines",

        `RULE RARITY NOT IN RARE, COMMON\r\n
            RULE RARITY IS RARE\r\n
            RULE RARITY IS RARE\r\n
            RULE RARITY IS RARE\r\n
            \r\n
            \r\n
            \r\n
            RULE RARITY IS RARE`,
      ],
      ["STANDARD expansion", "RULE EXPANSION IS STANDARD"],
      ["COPIES attribute with number", "RULE COPIES IS 1"],
    ])("should return an empty array for valid inputs for %o", (_, input) => {
      const result = validateInput(input);
      expect(result).toEqual([]);
    });
  });

  describe("Validate Rule Start", () => {
    it.each([
      ["it is missing RULE on single line", "RARITY IS RARE"],
      [
        "it is missing RULE on multi line",
        `RULE RARITY NOT IN RARE, COMMON\r\n
      RARITY IS RARE`,
      ],
      [
        "it is missing RULE on multi line > 2 lines",
        `RULE RARITY NOT IN RARE, COMMON\r\n
        \r\n
        RULE RARITY NOT IN RARE, COMMON\r\n
        RULE RARITY NOT IN RARE, COMMON\r\n
        RARITY IS RARE\r\n
        RULE RARITY NOT IN RARE, COMMON\r\n`,
      ],
    ])(
      "should return 'Lines must start with a RULE definition' error when %o",
      (_, input) => {
        const result = validateInput(input);
        expect(result.length).toEqual(1);
        expect(result[0].message).toBe(
          "Lines must start with a RULE definition"
        );
      }
    );

    it.each([
      ["empty string", ""],
      ["only spaces", "          "],
    ])("should not return error if there is no word %o", (_, input) => {
      const result = validateInput(input);
      expect(result.length).toEqual(0);
    });
  });

  describe("Validate Attribute", () => {
    it.each([
      [
        "an invalid word is placed on the attribute place",
        "RULE WINRATE IS 70",
      ],
      ["an another keyoword is on the attribute place", "RULE IS IS RARE"],
      ["the attribute is in lowercase", "RULE rarity IS RARE"],
    ])("should return 'Unknown attribute' error when %o", (_, input) => {
      const result = validateInput(input);
      expect(result.length).toEqual(1);
      expect(result[0].message.startsWith("Unknown attribute:")).toBe(true);
    });

    it("should not return error if the user is still writing the attribute word (only sends error after a word is written on 3rd position)", () => {
      const result = validateInput("RULE card");
      expect(result).toEqual([]);
    });

    it("should not return error when the user stops writing the attribute word (sends error after a word is written on 3rd position)", () => {
      const result = validateInput("RULE card IS");
      expect(result.length).toEqual(1);
      expect(result[0].message.startsWith("Unknown attribute:")).toBe(true);
    });
  });

  describe("Validate Operator", () => {
    it.each([
      ["there are more than 1 value", "RULE RARITY IS COMMON, RARE"],
      [
        "there are more than 1 value with IS NOT",
        "RULE RARITY IS NOT COMMON, RARE",
      ],
    ])(
      "should return 'Invalid syntax for IS operator. For multiple parameters you should use IN.' error when %o",
      (_, input) => {
        const result = validateInput(input);
        expect(result.length).toEqual(1);
        expect(
          result[0].message.startsWith("Invalid syntax for IS operator.")
        ).toBe(true);
        expect(
          result[0].message.endsWith(
            "For multiple parameters you should use IN."
          )
        ).toBe(true);
      }
    );

    it("should not return error with IS NOT and 1 value", () => {
      const result = validateInput("RULE RARITY IS NOT LEGENDARY");
      expect(result).toEqual([]);
    });

    it("should return 'Invalid syntax. Did you mean NOT IN?' when the input is IN NOT", () => {
      const result = validateInput("RULE RARITY IN NOT COMMON, RARE");
      expect(result.length).toEqual(1);
      expect(result[0].message).toEqual("Invalid syntax. Did you mean NOT IN?");
    });

    it("should not return error with NOT IN operator", () => {
      const result = validateInput("RULE RARITY NOT IN EPIC, LEGENDARY");
      expect(result).toEqual([]);
    });

    it.each([
      [
        "an invalid word is placed on the attribute place",
        "RULE RARITY MAX RARE",
      ],
      [
        "an another keyoword is on the operator place",
        "RULE RARITY PALADIN RARE",
      ],
      ["the operator is in lowercase", "RULE RARITY is RARE"],
    ])("should return 'Unknown operator' error when %o", (_, input) => {
      const result = validateInput(input);
      expect(result.length).toEqual(1);
      expect(result[0].message.startsWith("Unknown operator:")).toBe(true);
    });
  });

  describe("Validade HS values", () => {
    it("should not validate HS values if attribute is COPIES", () => {
      const result = validateInput("RULE COPIES IS 1");
      expect(result).toEqual([]);
    });

    it.each([
      ["an invalid value is passed with IS operator", "RULE RARITY IS LEGEND"],
      [
        "an invalid value is passed with IS NOT operator",
        "RULE RARITY IS NOT LEGEND",
      ],
      [
        "an invalid value is passed with IN operator",
        "RULE RARITY IN LEGEND EPIC",
      ],
      [
        "an invalid value is passed with IN operator in later values",
        "RULE RARITY IN LEGENDARY EPIC DIAMOND",
      ],
      [
        "an invalid value is passed with NOT IN operator",
        "RULE RARITY NOT IN LEGEND EPIC",
      ],
      [
        "an invalid value is passed with NOT IN operator in later values",
        "RULE RARITY NOT IN LEGENDARY EPIC DIAMOND",
      ],
      [
        "an invalid value is passed with IN operator in later values with commas",
        "RULE RARITY IN LEGENDARY, EPIC, DIAMOND",
      ],
    ])("should return 'is not a valid value.' error when %o", (_, input) => {
      const result = validateInput(input);
      expect(result.length).toEqual(1);
      expect(result[0].message.endsWith("is not a valid value.")).toBe(true);
    });

    it("should not return error for STANDARD as an expansion", () => {
      const result = validateInput("RULE EXPANSION IS STANDARD");
      expect(result).toEqual([]);
    });
  });

  describe("Validate Semantics", () => {
    it("should return 'Invalid operator for COPIES.' error when the attribute is COPIES and the operator is not IS or IS NOT", () => {
      const result = validateInput("RULE COPIES IN 1 2 3");
      expect(result.length).toEqual(1);
      expect(result[0].message.startsWith("Invalid operator for COPIES.")).toBe(
        true
      );
    });

    it("should return 'Invalid value for COPIES. Must be numeric.' error when the attribute is COPIES and the HsValue is not a numeric value", () => {
      const result = validateInput("RULE COPIES IS ONE");
      expect(result.length).toEqual(1);
      expect(result[0].message).toEqual(
        "Invalid value for COPIES. Must be numeric."
      );
    });

    it.each([
      [
        "EXPANSION and a class (PALADIN)",
        "RULE EXPANSION IS PALADIN",
        "PALADIN",
        "expansion",
      ],
      [
        "EXPANSION and a class (PALADIN) in the middle of the IN values",
        "RULE EXPANSION IN GVG, TGT, BLACKROCK, PALADIN, UNGORO",
        "PALADIN",
        "expansion",
      ],
      ["CLASS and an EXPANSION (GVG)", "RULE CLASS IS GVG", "GVG", "class"],
      [
        "CLASS and an EXPANSION (GVG) in the middle of the IN values",
        "RULE CLASS IN DRUID, ROGUE, GVG, PALADIN, NEUTRAL",
        "GVG",
        "class",
      ],
      [
        "RARITY and a class (PALADIN)",
        "RULE RARITY IS PALADIN",
        "PALADIN",
        "rarity",
      ],
      [
        "RARITY and a class (PALADIN) in the middle of the IN values",
        "RULE RARITY IN COMMON, PALADIN, RARE",
        "PALADIN",
        "rarity",
      ],
      [
        "CARD_TYPE and a class (PALADIN)",
        "RULE CARD_TYPE IS PALADIN",
        "PALADIN",
        "card type",
      ],
      [
        "CARD_TYPE and a class (PALADIN) in the middle of the IN values",
        "RULE CARD_TYPE IN HERO, MINION, PALADIN",
        "PALADIN",
        "card type",
      ],
    ])(
      "should return error when attribute and hsValue does not match: %o",
      (_, input, word, entity) => {
        const result = validateInput(input);
        expect(result.length).toEqual(1);
        expect(result[0].message).toEqual(`${word} is not a valid ${entity}.`);
      }
    );
  });
});
