import { Editor } from "@monaco-editor/react";
import { Dispatch, useEffect, useRef } from "react";
import * as monacoEditor from "monaco-editor";
import { attributes, not, operators, hsValues, rule } from "./DSL/Grammar";
import { validateInput } from "./DSL/RuleValidator";

interface Props {
  setErrors: Dispatch<React.SetStateAction<monacoEditor.editor.IMarkerData[]>>,
  value: string,
  setValue:  Dispatch<React.SetStateAction<string>>,
}

export const Console: React.FC<Props> = ({ setErrors, value, setValue }) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );
  const monacoRef = useRef<typeof monacoEditor | null>(null);

  useEffect(() => {
    if (monacoRef.current) {
      const monaco = monacoRef.current;
      monaco.languages.register({ id: "Rules DSL" });

      monaco.languages.setMonarchTokensProvider("Rules DSL", {
        attributes,
        operators,
        not,
        hsValues,
        rule,
        tokenizer: {
          root: [
            [
              /@?[a-zA-Z][\w$]*/,
              {
                cases: {
                  "@rule": "rule",
                  "@attributes": "attributes",
                  "@not": "not",
                  "@operators": "operator",
                  "@hsValues": "hsValue",
                  "@default": "variable",
                },
              },
            ],
            [/@?\d[\w$]*/, "number"],
            [/[,;.]/, "comma"],
            // [/".*?"/, "string"],
            // [/\/\//, "comment"],
          ],
        },
      });

      monaco.editor.defineTheme("customTheme", {
        base: "vs-dark",
        rules: [
          { token: "rule", foreground: "#00fc00" },
          { token: "attributes", foreground: "#62B2E9" },
          { token: "not", foreground: "#FF0000" },
          { token: "operator", foreground: "#D28445" },
          { token: "hsValue", foreground: "#FF0084" },
          { token: "number", foreground: "#FFFF00" },
          { token: "variable", foreground: "#F8F8F8" },
          { token: "comma", foreground: "#F8F8F8" },
          //   { token: "comment", foreground: "#999999" },
          //   { token: "string", foreground: "#009966" },
        ],
        inherit: true,
        colors: {},
      });

      monaco.editor.setTheme("customTheme");

      monaco.languages.registerCompletionItemProvider("Rules DSL", {
        provideCompletionItems(model, position, context, token) {
          const word = model.getWordUntilPosition(position);
          const suggestions = [
            ...attributes.map((k) => {
              return {
                label: k,
                insertText: k,
                range: new monaco.Range(
                  position.lineNumber,
                  word.startColumn,
                  position.lineNumber,
                  word.endColumn
                ),
                kind: monaco.languages.CompletionItemKind.Keyword,
              };
            }),
            ...operators.map((k) => {
              return {
                label: k,
                insertText: k,
                range: new monaco.Range(
                  position.lineNumber,
                  word.startColumn,
                  position.lineNumber,
                  word.endColumn
                ),
                kind: monaco.languages.CompletionItemKind.Keyword,
              };
            }),
            ...not.map((k) => {
              return {
                label: k,
                insertText: k,
                range: new monaco.Range(
                  position.lineNumber,
                  word.startColumn,
                  position.lineNumber,
                  word.endColumn
                ),
                kind: monaco.languages.CompletionItemKind.Keyword,
              };
            }),
            ...hsValues.map((k) => {
              return {
                label: k,
                insertText: k,
                range: new monaco.Range(
                  position.lineNumber,
                  word.startColumn,
                  position.lineNumber,
                  word.endColumn
                ),
                kind: monaco.languages.CompletionItemKind.Keyword,
              };
            }),
            ...rule.map((k) => {
              return {
                label: k,
                insertText: k,
                range: new monaco.Range(
                  position.lineNumber,
                  word.startColumn,
                  position.lineNumber,
                  word.endColumn
                ),
                kind: monaco.languages.CompletionItemKind.Keyword,
              };
            }),
          ];

          return { suggestions };
        },
      });
    }
  }, [monacoRef.current]);

  const handleEditorChange = (value: any) => {
    if (editorRef.current && monacoRef.current) {
      const editor = editorRef.current;
      const monaco = monacoRef.current;
      const model = editor.getModel();

      const errors = validateInput(value);
      setErrors(errors);

      if (model) {
        monaco.editor.setModelMarkers(model, "owner", errors);
      }
    }
    setValue(value);
  };

  return (
    <Editor
      height="30vh"
      width={`75vw`}
      options={{ fontSize: 22 }}
      language={"Rules DSL"}
      theme="vs-dark"
      value={value}
      onChange={handleEditorChange}
      onMount={(editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
      }}
    ></Editor>
  );
};
