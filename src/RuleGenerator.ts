import { Rule } from "./DeckValidator";
import * as monacoEditor from "monaco-editor";
import { attributes, not, operators, hsValues, rule } from "./Grammar";

export const createRule = (input: string): Rule => {
  return () => true;
};

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
    const words = line.replace(/\s+/g, " ").trim().split(" ");
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

    // check semantics

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
        "Invalid syntax for IS operator"
      );
    }
  } else if (words[2] === "IN") {
    if (words[3] === "NOT") {
      return createMarker(
        index,
        line.indexOf(words[2]) + 1,
        line.indexOf(words[3]) + 1 + 3,
        "Invalid syntax. Did you mean NOT IN?",
        monacoEditor.MarkerSeverity.Warning
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

const createMarker = (
  index: number,
  startColumn: number,
  endColumn: number,
  message: string,
  severity: monacoEditor.MarkerSeverity = monacoEditor.MarkerSeverity.Error
): monacoEditor.editor.IMarkerData => ({
  startLineNumber: index + 1,
  endLineNumber: index + 1,
  startColumn,
  endColumn,
  message,
  severity,
});
