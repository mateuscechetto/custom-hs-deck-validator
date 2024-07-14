import { Link } from "react-router-dom";

function AboutDSL() {
  return (
    <div className="min-h-screen bg-[#222] text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold opacity-87">
          How does the Custom Hearthstone Rule Language work?
        </h1>

        <p className="mt-4 opacity-87">
          Welcome to our guide on using this Language designed to create Custom
          Rules to validate Hearthstone decks. With this language, you can
          specify attributes and conditions that all cards in the deck must
          meet.
        </p>

        <h2 className="text-2xl font-bold mt-8 opacity-87">The syntax</h2>
        <p className="mt-4 opacity-87">A rule can be defined by:</p>
        <pre className="bg-[#333] p-4 rounded mt-4 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
          <code>{`{RULE} {ATTRIBUTE} {OPERATOR} {VALUE}+`}</code>
        </pre>
        <p className="mt-4 opacity-87">
          It is possible to write as many rules as you want. Each line is a rule
          and a line must start with <code>RULE</code>.
        </p>

        <h2 className="text-2xl font-bold mt-8 opacity-87">Attributes</h2>
        <p className="mt-4 opacity-87">
          Currently, we support the following card attributes:
        </p>
        <ul className="list-disc list-inside mt-4 opacity-87">
          <li>
            <strong>EXPANSION:</strong> The set a card belongs to
          </li>
          <li>
            <strong>CLASS:</strong> The class of the card
          </li>
          <li>
            <strong>RARITY:</strong> The rarity of the card
          </li>
          <li>
            <strong>CARD_TYPE:</strong> The type of the card:{" "}
            <code>MINION</code>, <code>SPELL</code>, <code>WEAPON</code>,{" "}
            <code>HERO</code>, <code>LOCATION</code>
          </li>
          <li>
            <strong>COPIES:</strong> The number of copies of the card is allowed
            in a deck. Useful to force Highlander decks.
          </li>
          <li>
            <strong>COST:</strong> The cost of the card.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 opacity-87">Operators</h2>
        <p className="mt-4 opacity-87">
          Currently, we support the following operators:
        </p>
        <ul className="list-disc list-inside mt-4 opacity-87">
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

        <h2 className="text-2xl font-bold mt-8 opacity-87">Values</h2>
        <p className="mt-4 opacity-87">
          <code>VALUE</code> are the Hearthstone values related to the{" "}
          <code>ATTRIBUTE</code>. Also added <code>STANDARD</code> as a valid{" "}
          <code>VALUE</code>, corresponding to list of <code>EXPANSION</code> in
          the current standard format. <code>ODD</code> and <code>EVEN</code>{" "}
          are valid <code>VALUE</code> for <code>COST</code>.
        </p>
        <p className="mt-4 opacity-87">
          <strong>Note:</strong> <code>COPIES</code> and <code>COST</code>{" "}
          attributes require a number after it, not a value from Hearthstone.{" "}
          <code>COST</code> can have '{"<"}' and '{">"}' modifiers with the
          number <strong>without white space</strong>.
        </p>

        <h2 className="text-2xl font-bold mt-8 opacity-87">Writing Rules</h2>
        <p className="mt-4 opacity-87">
          Here are some examples of valid rules:
        </p>
        <ol className="list-decimal list-inside mt-4 opacity-87">
          <li className="mt-2">
            <strong>Checking for a Specific Expansion:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE EXPANSION IS SHOWDOWN_BADLANDS`}</code>
          </pre>
          <p className="mt-2 opacity-87">
            It ensures that every card in the deck is from Showdown in the
            Badlands or its miniset.
          </p>

          <li className="mt-4">
            <strong>Excluding a Specific Expansion:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE EXPANSION NOT IS SHOWDOWN_BADLANDS`}</code>
          </pre>
          <p className="mt-2 opacity-87">
            It ensures that no card in the deck is from Showdown in the Badlands
            or its miniset.
          </p>

          <li className="mt-4">
            <strong>Checking for Multiple Expansions:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE EXPANSION IN SHOWDOWN_BADLANDS, WHIZBANGS_WORKSHOP, UNGORO`}</code>
          </pre>
          <p className="mt-2 opacity-87">
            It ensures that every card in the deck is from Showdown in the
            Badlands, Whizbang's Workshop, or Journey to Un'Goro, or their
            minisets.
          </p>

          <li className="mt-4">
            <strong>Excluding Multiple Expansions:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE EXPANSION NOT IN SHOWDOWN_BADLANDS, WHIZBANGS_WORKSHOP, UNGORO`}</code>
          </pre>
          <p className="mt-2 opacity-87">
            It ensures that no card in the deck is from Showdown in the
            Badlands, Whizbang's Workshop, or Journey to Un'Goro, or their
            minisets.
          </p>

          <li className="mt-4">
            <strong>Checking for deck valid in Standard:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE EXPANSION IS STANDARD`}</code>
          </pre>
          <p className="mt-2 opacity-87">
            It ensures that every card in the deck is from a standard set.
          </p>

          <li className="mt-4">
            <strong>Highlander Rule:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE COPIES IS 1`}</code>
          </pre>

          <li className="mt-4">
            <strong>"Pauper" Hearthstone:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE RARITY IN COMMON, RARE`}</code>
          </pre>
          <p className="mt-2 opacity-87">
            It ensures that every card is common or rare.
          </p>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE RARITY NOT IN EPIC, LEGENDARY`}</code>
          </pre>
          <p className="mt-2 opacity-87">
            It ensures that no card is epic or legendary.
          </p>
          <li className="mt-4">
            <strong>Odd cost cards:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE COST IS ODD`}</code>
          </pre>
          <li className="mt-4">
            <strong>Even cost cards:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE COST IS EVEN`}</code>
          </pre>
          <li className="mt-4">
            <strong>Check if all cards cost less than 4:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE COST IS <4`}</code>
          </pre>
          <li className="mt-4">
            <strong>Check if all cards cost less than 4 or cost 10:</strong>
          </li>
          <pre className="bg-[#333] p-4 rounded mt-2 overflow-x-auto max-w-full whitespace-pre-wrap break-words">
            <code>{`RULE COST IN <4, 10`}</code>
          </pre>
        </ol>

        <p className="mt-8 mb-8">
          We are always looking to improve and expand the capabilities of our
          Custom Hearthstone Rule Language. If you have suggestions or feedback,
          please{" "}
          <a
            href="https://x.com/molino_hs"
            target="_blank"
            className="text-[lightskyblue] hover:underline"
          >
            let us know!
          </a>{" "}
          Your input helps us make this tool better for everyone.
        </p>
      </div>
      <div>
        <Link to="/" className="bg-[#375a7f] text-white p-2 sm:p-3 rounded">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default AboutDSL;
