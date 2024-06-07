import { Card, Expansions, HsClass, STANDARD_EXPANSIONS } from "./../Card";
import { Rule } from "./../DeckValidator";
import { validateInput } from "./RuleValidator";

/**
 * @throws {Error} When input is not valid
 */
export const generateRules = (input: string): Rule[] => {
  if (validateInput(input).length) {
    throw new Error("Invalid Rules");
  }

  const rules: Rule[] = [];
  const lines = input.split("\r\n");

  const createSimpleRule = (
    attribute: string,
    operator: string,
    values: string[]
  ): Rule => {
    switch (operator) {
      case "IS":
        return (card: Card, _: number, __: HsClass) => {
          return checkAttribute(card, attribute, values[0]);
        };
      case "IS NOT":
        return (card: Card, _: number, __: HsClass) => {
          return !checkAttribute(card, attribute, values[0]);
        };
      case "IN":
        return (card: Card, _: number, __: HsClass) => {
          return values.some((value) => checkAttribute(card, attribute, value));
        };
      case "NOT IN":
        return (card: Card, _: number, __: HsClass) => {
          return !values.some((value) =>
            checkAttribute(card, attribute, value)
          );
        };
      default:
        throw new Error("Invalid operator");
    }
  };

  const checkAttribute = (card: Card, attribute: string, value: string) => {
    switch (attribute) {
      case "EXPANSION":
        if (value === "STANDARD") {
          return STANDARD_EXPANSIONS.includes(card.set);
        }
        return card.set === Expansions[value as keyof typeof Expansions];
      case "CLASS":
        return (
          card.cardClass === value || !!card.classes?.includes(value as HsClass)
        );
      case "RARITY":
        return card.rarity === value;
      case "CARD_TYPE":
        return card.type === value;
      default:
        throw new Error("Invalid attribute");
    }
  };

  lines.forEach((line) => {
    if (line.length === 0) return;

    const words = line.replace(/\s+/g, " ").trim().split(" ");

    const hasNot = words[2] === "NOT" || words[3] === "NOT";

    if (words.length < 4 || (hasNot && words.length < 5)) {
      throw new Error("Invalid Rules");
    }

    const attribute = words[1];
    const operator = hasNot ? `${words[2]} ${words[3]}` : words[2];
    const values = words
      .slice(hasNot ? 4 : 3)
      .map((value) => value.replace(",", ""));

    if (attribute === "COPIES") {
      if (operator === "IS") {
        rules.push(
          (_: Card, copies: number, __: HsClass) => copies === Number(values[0])
        );
      } else {
        rules.push(
          (_: Card, copies: number, __: HsClass) => copies !== Number(values[0])
        );
      }
    } else {
      rules.push(createSimpleRule(attribute, operator, values));
    }
  });

  return rules;
};
