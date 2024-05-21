import "./App.css";
import { CardAndCopies, Rule, validateDeckString } from "./DeckValidator";
import { Card, Expansion, Expansions, HsClass, HsClasses } from "./Card";
import { useState } from "react";
import { Console } from "./Console";

function App() {
  const [deckString, setDeckString] = useState("");
  const [invalidCards, setInvalidCards] = useState<CardAndCopies[]>([]);
  const [validatedDeck, setValidatedDeck] = useState(false);

  const handleValidate = () => {
    const invalids = validateDeckString(deckString, [
      generateValidExpansionsRule([
        Expansions.SHOWDOWN_BADLANDS,
        Expansions.THE_SUNKEN_CITY,
        Expansions.FESTIVAL_OF_LEGENDS,
      ]),
      highlanderRule,
    ]);
    setInvalidCards(invalids);
    setValidatedDeck(true);
  };

  const onlyClassCards: Rule = (card: Card, _: number, __: HsClass) => {
    return card.cardClass !== HsClasses.NEUTRAL;
  };

  const onlyBadlandstExpansion: Rule = (card: Card, _: number, __: HsClass) => {
    return (
      card.set === Expansions.SHOWDOWN_BADLANDS ||
      card.set === Expansions.THE_SUNKEN_CITY
    );
  };

  const generateValidExpansionsRule = (expansions: Expansion[]): Rule => {
    return (card: Card, _: number, __: HsClass) => {
      return expansions.includes(card.set);
    };
  };

  const highlanderRule: Rule = (card: Card, copies: number, _: HsClass) => {
    return copies === 1;
  };

  return (
    <>
      <Console></Console>
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
