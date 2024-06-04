import "./App.css";
import { CardAndCopies, validateDeckString } from "./DeckValidator";
import { useState } from "react";
import { Console } from "./Console";
import * as monacoEditor from "monaco-editor";
import { generateRules } from "./RuleGenerator";

function App() {
  const [deckString, setDeckString] = useState("");
  const [invalidCards, setInvalidCards] = useState<CardAndCopies[]>([]);
  const [validatedDeck, setValidatedDeck] = useState(false);
  const [rulesString, setRulesString] = useState<string>("");
  const [errors, setErrors] = useState<monacoEditor.editor.IMarkerData[]>([]);
  const [rulesError, setRulesError] = useState(false);

  const handleValidate = () => {
    setRulesError(false);
    setInvalidCards([]);
    setValidatedDeck(false);
    try {
      const invalids = validateDeckString(
        deckString,
        generateRules(rulesString)
      );
      setInvalidCards(invalids);
      setValidatedDeck(true);
    } catch (error) {
      setRulesError(true);
    }
  };

  const renderValidationResults = () => {
    if (rulesError) {
      return <span>Invalid Rules</span>;
    }
    if (validatedDeck) {
      if (invalidCards.length > 0) {
        return (
          <>
            <span>Invalid Cards:</span>
            <ul>
              {invalidCards.map(({ cardObject }) => (
                <li key={cardObject.id}>{cardObject.name}</li>
              ))}
            </ul>
          </>
        );
      }
      return <span>All Cards are Valid!</span>;
    }
    return null;
  };

  return (
    <>
      <Console
        setErrors={setErrors}
        value={rulesString}
        setValue={setRulesString}
      ></Console>
      <div>
        <input
          type="text"
          placeholder="Insert Deck Code"
          value={deckString}
          onChange={(event) => setDeckString(event.target.value)}
        />
        <button onClick={handleValidate} disabled={errors.length > 0}>
          Verify Deck
        </button>
      </div>
      {renderValidationResults()}
    </>
  );
}

export default App;
