import { CardRarity } from "../Card";

interface CardTileProps {
	id: string;
	cost: number;
	name: string;
	copies?: number;
	rarity?: CardRarity;
}

export const CardTile: React.FC<CardTileProps> = ({
	id,
	cost,
	name,
	copies,
	rarity,
}) => {
	return (
		<div className="flex border border-black rounded">
			<Cost cost={cost} rarity={rarity}></Cost>
			<CardTileMain id={id} name={name}></CardTileMain>
			<Copies copies={copies} rarity={rarity}></Copies>
		</div>
	);
};

const rarityColors: Record<CardRarity, string> = {
	FREE: "bg-slate-500",
	COMMON: "bg-slate-500",
	RARE: "bg-sky-800",
	EPIC: "bg-violet-800",
	LEGENDARY: "bg-yellow-600",
};

const Cost: React.FC<{ cost: number; rarity?: CardRarity }> = ({
	cost,
	rarity = "FREE",
}) => {
	const rarityColor = rarityColors[rarity] ?? "#858585";

	return (
		<div
			className={`${rarityColor} w-[34px] h-[34px] flex items-center justify-center font-bold text-lg rounded-l`}
		>
			{cost}
		</div>
	);
};

const CardTileMain: React.FC<{ id: string; name: string }> = ({ id, name }) => {
	return (
		<div
			className="w-full flex items-center text-left overflow-hidden flex-1 bg-cover h-[34px] text-slate-100 font-bold bg-gray-800 drop-shadow-lg"
			style={{
				backgroundImage: `linear-gradient(65deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) calc(100% - 150px), rgba(0, 0, 0, 0) calc(100% - 50px), rgba(0, 0, 0, 0)), url("https://art.hearthstonejson.com/v1/tiles/${id}.webp")`,
			}}
		>
			<span className="p-2">{name}</span>
		</div>
	);
};

const Copies: React.FC<{ copies?: number; rarity?: CardRarity }> = ({
	copies = 1,
	rarity = "FREE",
}) => {
	const rarityColor = "bg-zinc-900";

	return (
		<div
			className={`${rarityColor} w-[34px] h-[34px] flex items-center justify-center font-bold text-lg rounded-r text-yellow-600`}
		>
			{rarity === "LEGENDARY" ? "★" : copies}
		</div>
	);
};
