import { Link } from "react-router-dom";
import "./AboutDSL.css";

function AboutDSL() {
  return (
    <>
      <div className="back-button" style={{ zIndex: 33 }}>
        {/* adds zindex to be in front of containers margin/padding */}
        <Link to="/">Back</Link>
      </div>
      <div className="container">
        <h1>How does the Custom Hearthstone Rule Language work?</h1>
        <p>
          Welcome to our guide on using this Language designed to create Custom
          Rules to validate Hearthstone decks. With this language, you can
          specify attributes and conditions that all cards in the deck must
          meet.
        </p>

        <h2>The syntax</h2>
        <p>A rule can be defined by:</p>
        <pre>
          <code>(RULE) (ATTRIBUTE) (OPERATOR) (VALUE)+</code>
        </pre>
        <p>
          It is possible to write as many rules as you want. Each line is a
          rule, and a line must start with <code>RULE</code>.
        </p>

        <h3>Attributes</h3>
        <p>Currently, we support the following card attributes:</p>
        <ul>
          <li>
            <strong>EXPANSION:</strong> The set a card belongs to.
          </li>
          <li>
            <strong>CLASS:</strong> The class of the card.
          </li>
          <li>
            <strong>RARITY:</strong> The rarity of the card.
          </li>
          <li>
            <strong>CARD_TYPE:</strong> The type of the card:{" "}
            <code>MINION</code>, <code>SPELL</code>, <code>WEAPON</code>,{" "}
            <code>HERO</code>, <code>LOCATION</code>
          </li>
          <li>
            <strong>COPIES:</strong> The number of copies of the card allowed in
            a deck. Useful to force Highlander decks.
          </li>
        </ul>

        <h3>Operators</h3>
        <p>Currently, we support the following operators:</p>
        <ul>
          <li>
            <strong>IS:</strong> Checks if the attribute is equal to a specific
            value.
          </li>
          <li>
            <strong>IS NOT:</strong> Checks if the attribute is not equal to a
            specific value.
          </li>
          <li>
            <strong>IN:</strong> Checks if the attribute is within a list of
            values.
          </li>
          <li>
            <strong>NOT IN:</strong> Checks if the attribute is not within a
            list of values.
          </li>
        </ul>

        <h3>Values</h3>
        <p>
          <code>VALUE</code> are the Hearthstone values related to the{" "}
          <code>ATTRIBUTE</code>. We also added <code>STANDARD</code> as a valid{" "}
          <code>VALUE</code>, corresponding to the list of{" "}
          <code>EXPANSION</code> in the current standard format.
          <br />
          <strong>Note:</strong> The<code>COPIES</code> attribute requires a
          number after it, not a value from Hearthstone.
        </p>

        <h2>Writing Rules</h2>
        <p>Here are some examples of valid rules:</p>
        <ol>
          <li>
            <strong>Checking for a Specific Expansion:</strong>
            <br />
            <pre>
              <code>RULE EXPANSION IS SHOWDOWN_BADLANDS</code>
            </pre>
            It ensures that every card in the deck is from Showdown in the
            Badlands or its miniset.
          </li>
          <li>
            <strong>Excluding a Specific Expansion:</strong>
            <br />
            <pre>
              <code>RULE EXPANSION NOT IS SHOWDOWN_BADLANDS</code>
            </pre>
            It ensures that no card in the deck is from Showdown in the Badlands
            or its miniset.
          </li>
          <li>
            <strong>Checking for Multiple Expansions:</strong>
            <br />
            <pre>
              <code>
                RULE EXPANSION IN SHOWDOWN_BADLANDS, WHIZBANGS_WORKSHOP, UNGORO
              </code>
            </pre>
            It ensures that every card in the deck is from Showdown in the
            Badlands, Whizbang's Workshop, or Journey to Un'Goro, or their
            minisets.
          </li>
          <li>
            <strong>Excluding Multiple Expansions:</strong>
            <br />
            <pre>
              <code>
                RULE EXPANSION NOT IN SHOWDOWN_BADLANDS, WHIZBANGS_WORKSHOP,
                UNGORO
              </code>
            </pre>
            It ensures that no card in the deck is from Showdown in the
            Badlands, Whizbang's Workshop, or Journey to Un'Goro, or their
            minisets.
          </li>
          <li>
            <strong>Checking for Deck Validity in Standard:</strong>
            <br />
            <pre>
              <code>RULE EXPANSION IS STANDARD</code>
            </pre>
            It ensures that every card in the deck is from a standard set.
          </li>
          <li>
            <strong>Highlander Rule:</strong>
            <br />
            <pre>
              <code>RULE COPIES IS 1</code>
            </pre>
            It ensures that only one copy of each card is allowed in the deck.
          </li>
          <li>
            <strong>"Pauper" Hearthstone:</strong>
            <br />
            <pre>
              <code>RULE RARITY IN COMMON, RARE</code>
            </pre>
            It ensures that every card is common or rare.
            <br />
            <pre>
              <code>RULE RARITY NOT IN EPIC, LEGENDARY</code>
            </pre>
            It ensures that no card is epic or legendary.
          </li>
        </ol>

        <h2>Help us to improve this Language</h2>
        <p>
          We are always looking to improve and expand the capabilities of our
          Custom Hearthstone Rule Language. If you have suggestions or feedback,
          please{" "}
          <a href="https://x.com/molino_hs" target="_blank">
            let us know!
          </a>{" "}
          Your input helps us make this tool better for everyone.
        </p>
      </div>
    </>
  );
}

export default AboutDSL;
