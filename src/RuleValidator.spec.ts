import "@testing-library/jest-dom";
import { validateInput } from "./RuleValidator";

describe("Rule Validator", () => {
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
  ])("should return an empty array for valid inputs for %o", (_, input) => {
    const result = validateInput(input);
    expect(result).toEqual([]);
  });
});
