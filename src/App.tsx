import "./App.css";
import { CardAndCopies, Rule, validateDeckString } from "./DeckValidator";
import { Card, HsClass } from "./Card";
import { useState } from "react";

function App() {
  const [deckString, setDeckString] = useState("");
  const [invalidCards, setInvalidCards] = useState<CardAndCopies[]>([]);
  const [validatedDeck, setValidatedDeck] = useState(false);

  const handleValidate = () => {
    const invalids = validateDeckString(deckString, [onlyClassCards]);
    setInvalidCards(invalids);
    setValidatedDeck(true);
  };

  const onlyClassCards: Rule = (card: Card, _: number, deckClass: HsClass) => {
    return (
      card.cardClass === deckClass ||
      !!card.classes?.find((c) => c === deckClass)
    );
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Insert Deck Code"
          value={deckString}
          onChange={(event) => setDeckString(event.target.value)}
        />
        <button onClick={() => handleValidate()}>
          Verify if deck has no neutrals
        </button>
      </div>
      <>
        {validatedDeck && invalidCards && invalidCards.length > 0 && (
          <>
            <span>Invalid Cards:</span>
            <ul>
              {invalidCards.map(({ cardObject }) => (
                <li key={cardObject.id}>{cardObject.name}</li>
              ))}
            </ul>
          </>
        )}
        {validatedDeck && invalidCards && !invalidCards.length && (
          <span>All Cards are Valid!</span>
        )}
      </>
    </>
  );
}

export default App;
