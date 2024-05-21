import { Rule } from "./DeckValidator";
import * as monacoEditor from "monaco-editor";

export const createRule = (input: string): Rule => {
  return () => true;
};

export const checkSintax = (
  input: string
): monacoEditor.editor.IMarkerData[] => {
  const lines = input.split("\r\n");
  console.log(lines);
  const markers: monacoEditor.editor.IMarkerData[] = [];
  lines.forEach((line, index) => {
    if (line.length == 0) {
      return;
    }
    const words = line.replace(/\s+/g, " ").trim().split(" ");
    if (words[0] !== "RULE") {
      markers.push({
        startLineNumber: index + 1,
        endLineNumber: index + 1,
        startColumn: line.indexOf(words[0]) + 1,
        endColumn: line.indexOf(words[0]) + 1 + words[0].length,
        message: "Lines must start with a RULE definition",
        severity: 8,
      });
    }
  });

  return markers;
};

// Expression examples
// RULE EXPANSION IS SHOWDOWN_BADLANDS
// RULE EXPANSION IS NOT SHOWDOWN_BADLANDS
// RULE EXPANSION IN SHOWDOWN_BADLANDS, THE_SUNKEN_CITY
// RULE EXPANSION NOT IN SHOWDOWN_BADLANDS, THE_SUNKEN_CITY
// RULE COPIES IS 1
// RULE CLASS NOT IN NEUTRAL

// TOKENS:
// IN: 'IN'
// NOT: 'NOT'
// IS: 'IS'
//
