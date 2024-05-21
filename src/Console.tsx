import { Editor } from "@monaco-editor/react";
import { CardRarities, CardTypes, Expansions, HsClasses } from "./Card";
import { useEffect, useRef, useState } from "react";
import * as monacoEditor from "monaco-editor";
import { checkSintax } from "./RuleGenerator";
const attributes = ["EXPANSION", "CLASS", "RARITY", "CARD_TYPE", "COPIES"];
const operators = ["IN", "NOT", "IS"];
const not = ["NOT"];
const hsValues = [
  ...Object.values(HsClasses),
  ...Object.values(CardRarities),
  ...Object.keys(Expansions),
  ...Object.values(CardTypes),
];
const rule = ["RULE"];

export const Console = () => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );
  const monacoRef = useRef<typeof monacoEditor | null>(null);
  const [value, setValue] = useState(null);

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

      monaco.editor.setTheme('customTheme');

      console.log('chamou aqui ó')


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
      console.log(JSON.stringify(value))

      const errors = checkSintax(value);

      console.log('roooooooo', errors)

      if (errors.length && model) {
        console.log('eeoe me dooood')
        monaco.editor.setModelMarkers(model, "owner", errors);
      }

      // if (model) {
      //   const markers: monacoEditor.editor.IMarkerData[] = [
      //     {
      //       startLineNumber: 1,
      //       startColumn: 1,
      //       endLineNumber: 1,
      //       endColumn: 10,
      //       message: "Error message for line 3",
      //       severity: monaco.MarkerSeverity.Error,
      //     },
      //     // Add more markers as needed
      //   ];
      //   monaco.editor.setModelMarkers(model, "owner", markers);
      // }
    }
    setValue(value);
  };



  return (
    <>
      <Editor
        height="85vh"
        width={`80vw`}
        options={{ fontSize: 22 }}
        language={"Rules DSL"}
        theme="customTheme"
        onChange={handleEditorChange}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          monacoRef.current = monaco;
        }}
      ></Editor>
      {value}
    </>
  );
};
