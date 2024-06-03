import * as monacoEditor from "monaco-editor";
import { attributes, hsValues } from "./Grammar";
import { CardRarities, CardTypes, Expansions, HsClasses } from "./Card";

export const validateInput = (
  input: string
): monacoEditor.editor.IMarkerData[] => {
  const lines = input.split("\r\n");
  const markers: monacoEditor.editor.IMarkerData[] = [];
  lines.forEach((line, index) => {
    // check syntax
    if (line.length == 0) {
      return;
    }
    const words = line.split(" ").filter((word) => word.trim() !== "");
    if (words.length == 0) {
      return;
    }
    const ruleError = validateRuleStart(words, line, index);
    if (ruleError) {
      markers.push(ruleError);
      return;
    }

    const attributeError = validateAttribute(words, line, index);
    if (attributeError) {
      markers.push(attributeError);
      return;
    }

    const operatorError = validateOperator(words, line, index);
    if (operatorError) {
      markers.push(operatorError);
      return;
    }

    const hsValuesError = validateHSValues(words, line, index);
    if (hsValuesError) {
      markers.push(hsValuesError);
      return;
    }

    // check semantics
    const semanticsError = validateSemantics(words, line, index);
    if (semanticsError) {
      markers.push(semanticsError);
    }
  });

  return markers;
};

const validateRuleStart = (
  words: string[],
  line: string,
  index: number
): monacoEditor.editor.IMarkerData | null => {
  if (words[0] !== "RULE") {
    return createMarker(
      index,
      line.indexOf(words[0]) + 1,
      line.indexOf(words[0]) + 1 + words[0].length,
      "Lines must start with a RULE definition"
    );
  }
  return null;
};

const validateAttribute = (
  words: string[],
  line: string,
  index: number
): monacoEditor.editor.IMarkerData | null => {
  if (words.length < 3) {
    return null;
  }
  if (!attributes.includes(words[1])) {
    return createMarker(
      index,
      line.indexOf(words[1]) + 1,
      line.indexOf(words[1]) + 1 + words[1].length,
      `Unknown attribute: ${
        words[1]
      }.\nSupported attributes: ${attributes.toString()}`
    );
  }
  return null;
};

const validateOperator = (
  words: string[],
  line: string,
  index: number
): monacoEditor.editor.IMarkerData | null => {
  if (words.length < 4) {
    return null;
  }
  if (words[2] === "IS") {
    if ((words.length === 5 && words[3] !== "NOT") || words.length > 5) {
      return createMarker(
        index,
        line.indexOf(words[2]) + 1,
        line.length + 1,
        "Invalid syntax for IS operator.\nFor multiple parameters you should use IN."
      );
    }
  } else if (words[2] === "IN") {
    if (words[3] === "NOT") {
      return createMarker(
        index,
        line.indexOf(words[2]) + 1,
        line.indexOf(words[3]) + 1 + 3,
        "Invalid syntax. Did you mean NOT IN?",
        monacoEditor.MarkerSeverity?.Warning
      );
    }
    return null;
  } else if (words[2] === "NOT" && words[3] === "IN") {
    return null;
  } else {
    return createMarker(
      index,
      line.indexOf(words[2]) + 1,
      line.indexOf(words[2]) + 1 + words[2].length,
      `Unknown operator: ${words[2]}.\nSupported operators: IS, IS NOT, IN, NOT IN`
    );
  }

  return null;
};

const validateHSValues = (
  words: string[],
  line: string,
  index: number
): monacoEditor.editor.IMarkerData | null => {
  if (words[1] === "COPIES") {
    return null;
  }
  const startIndex = words.includes("NOT") ? 4 : 3;
  const values = words.slice(startIndex);
  let error: monacoEditor.editor.IMarkerData | null = null;
  values.forEach((word, i) => {
    if (error) return;
    word = word.replace(",", "");
    if (!hsValues.includes(word)) {
      error = createMarker(
        index,
        line.lastIndexOf(words[startIndex + i]) + 1,
        line.lastIndexOf(words[startIndex + i]) + 1 + word.length,
        `${word} is not a valid value.`
      );
    }
  });

  return error;
};

const validateSemantics = (
  words: string[],
  line: string,
  index: number
): monacoEditor.editor.IMarkerData | null => {
  const validNumbers = /^\d+$/;
  switch (words[1]) {
    case "COPIES": {
      const isNot = words[2] === "IS" && words[3] === "NOT";
      const value = isNot ? words[4] : words[3];
      if (words[2] !== "IS" && !isNot) {
        return createMarker(
          index,
          line.lastIndexOf(words[2]) + 1,
          line.lastIndexOf(words[2]) + 1 + words[2].length,
          `Invalid operator for COPIES. Must be "IS" or "IS NOT".`
        );
      } else if (!validNumbers.test(value)) {
        return createMarker(
          index,
          line.lastIndexOf(value) + 1,
          line.lastIndexOf(value) + 1 + value.length,
          `Invalid value for COPIES. Must be numeric.`
        );
      }
      return null;
    }
    case "EXPANSION":
      if (words[2] === "IS") {
        return validateSingleValue(
          words,
          index,
          line,
          [...Object.keys(Expansions), "STANDARD"],
          "expansion"
        );
      } else {
        return validateValues(
          words,
          index,
          line,
          [...Object.keys(Expansions), "STANDARD"],
          "expansion"
        );
      }
    case "CLASS":
      if (words[2] === "IS") {
        return validateSingleValue(
          words,
          index,
          line,
          Object.values(HsClasses),
          "class"
        );
      } else {
        return validateValues(
          words,
          index,
          line,
          Object.values(HsClasses),
          "class"
        );
      }
    case "RARITY":
      if (words[2] === "IS") {
        return validateSingleValue(
          words,
          index,
          line,
          Object.values(CardRarities),
          "rarity"
        );
      } else {
        return validateValues(
          words,
          index,
          line,
          Object.values(CardRarities),
          "rarity"
        );
      }
    case "CARD_TYPE":
      if (words[2] === "IS") {
        return validateSingleValue(
          words,
          index,
          line,
          Object.values(CardTypes),
          "card type"
        );
      } else {
        return validateValues(
          words,
          index,
          line,
          Object.values(CardTypes),
          "card type"
        );
      }
    default:
      return null;
  }
};

const validateValues = (
  words: string[],
  index: number,
  line: string,
  validValues: string[],
  entity: string
): monacoEditor.editor.IMarkerData | null => {
  const operatorIndex = words[2] === "NOT" ? 3 : 2;
  const startIndex = operatorIndex + 1;
  const values = words.slice(startIndex);
  let error: monacoEditor.editor.IMarkerData | null = null;

  values.forEach((word, i) => {
    if (error) return;
    word = word.replace(",", "");
    if (!validValues.includes(word)) {
      error = createMarker(
        index,
        line.lastIndexOf(words[startIndex + i]) + 1,
        line.lastIndexOf(words[startIndex + i]) + 1 + word.length,
        `${word} is not a valid ${entity}.`
      );
    }
  });

  return error;
};

const validateSingleValue = (
  words: string[],
  index: number,
  line: string,
  validValues: string[],
  entity: string
): monacoEditor.editor.IMarkerData | null => {
  const valueIndex = words[3] === "NOT" ? 4 : 3;
  const value = words[valueIndex];
  if (!validValues.includes(value)) {
    return createMarker(
      index,
      line.lastIndexOf(value) + 1,
      line.lastIndexOf(value) + 1 + value.length,
      `${value} is not a valid ${entity}.`
    );
  }
  return null;
};

const createMarker = (
  index: number,
  startColumn: number,
  endColumn: number,
  message: string,
  severity: monacoEditor.MarkerSeverity = monacoEditor.MarkerSeverity?.Error
): monacoEditor.editor.IMarkerData => ({
  startLineNumber: index + 1,
  endLineNumber: index + 1,
  startColumn,
  endColumn,
  message,
  severity,
});
