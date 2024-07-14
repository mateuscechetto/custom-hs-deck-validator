import { CardAndCopies, validateDeckString } from "./DeckValidator";
import { useState } from "react";
import { Console } from "./Console";
import * as monacoEditor from "monaco-editor";
import { generateRules } from "./DSL/RuleGenerator";
import useScreenOrientationMessage from "./hooks/useScreenOrientation";
import { Link } from "react-router-dom";
import { CardTile } from "./components/CardTile";

function Home() {
	const [deckString, setDeckString] = useState("");
	const [invalidCards, setInvalidCards] = useState<CardAndCopies[]>([]);
	const [validCards, setValidCards] = useState<CardAndCopies[]>([]);
	const [validatedDeck, setValidatedDeck] = useState(false);
	const [rulesString, setRulesString] = useState<string>("");
	const [sintaxErrors, setSintaxErrors] = useState<
		monacoEditor.editor.IMarkerData[]
	>([]);
	const [validationError, setValidationError] = useState("");
	const orientationMessage = useScreenOrientationMessage();

	const handleValidate = () => {
		setValidationError("");
		setInvalidCards([]);
		setValidatedDeck(false);
		try {
			const { valid, invalid } = validateDeckString(
				deckString,
				generateRules(rulesString),
			);
			setValidCards(valid);
			setInvalidCards(invalid);
			setValidatedDeck(true);
		} catch (error) {
			if (typeof error === "string") {
				setValidationError(error);
			} else if (error instanceof Error) {
				setValidationError(error.message);
			}
		}
	};

	const renderValidationResults = () => {
		if (validationError !== "") {
			return <span>{validationError}</span>;
		}
		if (validatedDeck) {
			if (invalidCards.length > 0) {
				return (
					<>
						<span>Invalid Cards:</span>
						<ul>
							{invalidCards.map(({ cardObject, copies }) => (
								<li key={cardObject.id} className="min-w-[350px]">
									<CardTile
										id={cardObject.id}
										name={cardObject.name}
										cost={cardObject.cost}
										rarity={cardObject.rarity}
										copies={copies}
									></CardTile>
								</li>
							))}
						</ul>
						<span>Valid Cards:</span>
						<ul>
							{validCards.map(({ cardObject, copies }) => (
								<li key={cardObject.id} className="min-w-[350px]">
									<CardTile
										id={cardObject.id}
										name={cardObject.name}
										cost={cardObject.cost}
										rarity={cardObject.rarity}
										copies={copies}
									></CardTile>
								</li>
							))}
						</ul>
					</>
				);
			}
			return (
				<>
					<span>All Cards are Valid!</span>
					<ul>
						{validCards.map(({ cardObject, copies }) => (
							<li key={cardObject.id} className="min-w-[350px]">
								<CardTile
									id={cardObject.id}
									name={cardObject.name}
									cost={cardObject.cost}
									rarity={cardObject.rarity}
									copies={copies}
								></CardTile>
							</li>
						))}
					</ul>
				</>
			);
		}
		return null;
	};

	return (
		<>
			{orientationMessage}
			<div
				style={{ textAlign: "left", marginBottom: "16px", fontSize: "1.15rem" }}
			>
				<Link to="about" className="text-[lightskyblue]">
					How does it work?
				</Link>
			</div>
			<Console
				setErrors={setSintaxErrors}
				value={rulesString}
				setValue={setRulesString}
			></Console>
			<div className="flex gap-4 mt-8 w-[75vw] h-10">
				<input
					className="w-10/12 text-center text-black rounded-md"
					type="text"
					placeholder="Insert Deck Code"
					value={deckString}
					onChange={event => setDeckString(event.target.value)}
				/>
				<button
					className="w-2/12 bg-[#375a7f] disabled:opacity-50 rounded-sm"
					onClick={handleValidate}
					disabled={sintaxErrors.length > 0}
				>
					Verify Deck
				</button>
			</div>
			<div className="mt-8">{renderValidationResults()}</div>
		</>
	);
}

export default Home;
