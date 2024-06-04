import { Card, Expansions, HsClass, STANDARD_EXPANSIONS } from "./Card";
import { Rule } from "./DeckValidator";
import { validateInput } from "./RuleValidator";

export const generateRules = (input: string): Rule[] => {
  if (validateInput(input).length) {
    throw new Error("Invalid Rules");
  }
  const rules: Rule[] = [];
  const lines = input.split("\r\n");
  lines.forEach((line) => {
    if (line.length == 0) {
      return;
    }
    const words = line.replace(/\s+/g, " ").trim().split(" ");

    const attribute = words[1];
    const hasNot = words[2] === "NOT" || words[3] === "NOT";
    const operator = hasNot ? `${words[2]} ${words[3]}` : words[2];
    const values = words
      .slice(hasNot ? 4 : 3)
      .map((value) => value.replace(",", ""));

    switch (attribute) {
      case "EXPANSION":
        if (operator === "IS") {
          if (values[0] === "STANDARD") {
            rules.push((card: Card, _: number, __: HsClass) => {
              return STANDARD_EXPANSIONS.includes(card.set);
            });
          } else {
            rules.push((card: Card, _: number, __: HsClass) => {
              return (
                card.set === Expansions[values[0] as keyof typeof Expansions]
              );
            });
          }
        } else if (operator === "IS NOT") {
          if (values[0] === "STANDARD") {
            rules.push((card: Card, _: number, __: HsClass) => {
              return !STANDARD_EXPANSIONS.includes(card.set);
            });
          } else {
            rules.push((card: Card, _: number, __: HsClass) => {
              return (
                card.set !== Expansions[values[0] as keyof typeof Expansions]
              );
            });
          }
        } else if (operator === "IN") {
          if (values.includes("STANDARD")) {
            const filteredValues = values.filter((v) => v !== "STANDARD");
            rules.push((card: Card, _: number, __: HsClass) => {
              return [...filteredValues, ...STANDARD_EXPANSIONS].includes(
                card.set
              );
            });
          } else {
            rules.push((card: Card, _: number, __: HsClass) => {
              return values
                .map((key) => Expansions[key as keyof typeof Expansions])
                .includes(card.set);
            });
          }
        } else if (values.includes("STANDARD")) {
          const filteredValues = values.filter((v) => v !== "STANDARD");
          rules.push((card: Card, _: number, __: HsClass) => {
            return ![...filteredValues, ...STANDARD_EXPANSIONS].includes(
              card.set
            );
          });
        } else {
          rules.push((card: Card, _: number, __: HsClass) => {
            return !values
              .map((key) => Expansions[key as keyof typeof Expansions])
              .includes(card.set);
          });
        }
        break;
      case "COPIES":
        if (operator === "IS") {
          const rule = (_: Card, copies: number, __: HsClass) => {
            return copies === Number(values[0]);
          };
          rules.push(rule);
        } else {
          rules.push((_: Card, copies: number, __: HsClass) => {
            return copies !== Number(values[0]);
          });
        }
    }
  });

  return rules;
};
