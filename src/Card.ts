export type Card = {
	artist: string;
	attack?: number;
	cardClass: HsClass;
	classes?: HsClass[];
	collectible: boolean;
	cost: number;
	dbfId: number;
	flavor: string;
	health?: number;
	id: string;
	mechanics?: string[];
	isMiniSet?: boolean;
	multiClassGroup?: string;
	name: string;
	rarity: CardRarity;
	referencedTags?: string[];
	set: Expansion;
	spellSchool?: SpellSchool;
	text: string;
	type: CardType;
	race?: MinionType;
	races?: MinionType[];
};

export const HsClasses = {
	DEATH_KNIGHT: "DEATHKNIGHT",
	DEMON_HUNTER: "DEMONHUNTER",
	DRUID: "DRUID",
	HUNTER: "HUNTER",
	MAGE: "MAGE",
	PALADIN: "PALADIN",
	PRIEST: "PRIEST",
	ROGUE: "ROGUE",
	SHAMAN: "SHAMAN",
	WARLOCK: "WARLOCK",
	WARRIOR: "WARRIOR",
	NEUTRAL: "NEUTRAL",
} as const;

export type HsClass = (typeof HsClasses)[keyof typeof HsClasses];

export const CardRarities = {
	FREE: "FREE",
	COMMON: "COMMON",
	RARE: "RARE",
	EPIC: "EPIC",
	LEGENDARY: "LEGENDARY",
} as const;

export type CardRarity = (typeof CardRarities)[keyof typeof CardRarities];

export const Expansions = {
	CORE: "CORE",
	GVG: "GVG",
	TGT: "TGT",
	BLACKROCK: "BRM",
	OLD_GODS: "OG",
	MEAN_STREETS: "GANGS",
	UNGORO: "UNGORO",
	FROZEN_THRONES: "ICECROWN",
	KOBOLDS: "LOOTAPALOOZA",
	WITHCWOOD: "GILNEAS",
	THE_BOOMSDAY_PROJECT: "BOOMSDAY",
	RASTAKHANS_RUMBLE: "TROLL",
	DALARAN: "DALARAN",
	ULDUM: "ULDUM",
	SCHOLOMANCE: "SCHOLOMANCE",
	BARRENS: "THE_BARRENS",
	STORMWIND: "STORMWIND",
	DARKMOON_FAIRE: "DARKMOON_FAIRE",
	ALTERAC_VALLEY: "ALTERAC_VALLEY",
	THE_SUNKEN_CITY: "THE_SUNKEN_CITY",
	NATHRIA: "REVENDRETH",
	TITANS: "TITANS",
	RETURN_OF_THE_LICH_KING: "RETURN_OF_THE_LICH_KING",
	FESTIVAL_OF_LEGENDS: "BATTLE_OF_THE_BANDS",
	PATH_OF_ARTHAS: "PATH_OF_ARTHAS",
	SHOWDOWN_BADLANDS: "WILD_WEST",
	WONDERS: "WONDERS", // something related to wild or twist
	WHIZBANGS_WORKSHOP: "WHIZBANGS_WORKSHOP",
	PERILS_IN_PARADISE: "ISLAND_VACATION",
	EVENT: "EVENT", // 10 year anniversary event -> Hearth Stone Brew and gift cards
} as const;

export type Expansion = (typeof Expansions)[keyof typeof Expansions];

export const STANDARD_EXPANSIONS: Expansion[] = [
	Expansions.CORE,
	Expansions.TITANS,
	Expansions.FESTIVAL_OF_LEGENDS,
	Expansions.SHOWDOWN_BADLANDS,
	Expansions.WHIZBANGS_WORKSHOP,
	Expansions.PERILS_IN_PARADISE,
	Expansions.EVENT,
];

export const SpellSchools = {
	NONE: "NONE",
	ARCANE: "ARCANE",
	FIRE: "FIRE",
	FROST: "FROST",
	NATURE: "NATURE",
	HOLY: "HOLY",
	SHADOW: "SHADOW",
	FEL: "FEL",
} as const;

export type SpellSchool = (typeof SpellSchools)[keyof typeof SpellSchools];

export const CardTypes = {
	MINION: "MINION",
	SPELL: "SPELL",
	WEAPON: "WEAPON",
	// TOKEN: "TOKEN",
	LOCATION: "LOCATION",
	HERO: "HERO",
} as const;

export type CardType = (typeof CardTypes)[keyof typeof CardTypes];

export const MinionTypes = {
	MURLOC: "MURLOC",
	DEMON: "DEMON",
	MECHANICAL: "MECHANICAL",
	ELEMENTAL: "ELEMENTAL",
	BEAST: "BEAST",
	TOTEM: "TOTEM",
	PIRATE: "PIRATE",
	DRAGON: "DRAGON",
	ALL: "ALL",
	UNDEAD: "UNDEAD",
	NAGA: "NAGA",
	QUILBOAR: "QUILBOAR",
} as const;

export type MinionType = (typeof MinionTypes)[keyof typeof MinionTypes];

export const heroIdToClass = (heroId: number): HsClass => {
	const map: Record<number, HsClass> = {
		671: HsClasses.PALADIN,
		893: HsClasses.WARLOCK,
		274: HsClasses.DRUID,
		930: HsClasses.ROGUE,
		78065: HsClasses.DEATH_KNIGHT,
		7: HsClasses.WARRIOR,
		31: HsClasses.HUNTER,
		1066: HsClasses.SHAMAN,
		813: HsClasses.PRIEST,
		637: HsClasses.MAGE,
		56550: HsClasses.DEMON_HUNTER,
	};
	return map[heroId] || HsClasses.DEATH_KNIGHT;
};
