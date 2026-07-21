import type { StockfishSearchOptions } from "@/composables/useStockfish";

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface StockfishStrengthConfig {
	skillLevel?: number;
	limitStrength: boolean;
	uciElo?: number;
}

export interface DifficultyConfig {
	level: DifficultyLevel;
	label: string;
	strength: StockfishStrengthConfig;
	search: StockfishSearchOptions;
}

const STANDARD_MOVETIME_MS = 2000;
const MASTER_MOVETIME_MS = 2500;

export const DIFFICULTY_LEVELS: Record<DifficultyLevel, DifficultyConfig> = {
	1: {
		level: 1,
		label: "Beginner",
		strength: { skillLevel: 0, limitStrength: true, uciElo: 1320 },
		search: { movetime: STANDARD_MOVETIME_MS },
	},
	2: {
		level: 2,
		label: "Novice",
		strength: { skillLevel: 3, limitStrength: true, uciElo: 1400 },
		search: { movetime: STANDARD_MOVETIME_MS },
	},
	3: {
		level: 3,
		label: "Casual",
		strength: { skillLevel: 6, limitStrength: true, uciElo: 1500 },
		search: { movetime: STANDARD_MOVETIME_MS },
	},
	4: {
		level: 4,
		label: "Intermediate",
		strength: { skillLevel: 9, limitStrength: true, uciElo: 1650 },
		search: { movetime: STANDARD_MOVETIME_MS },
	},
	5: {
		level: 5,
		label: "Advanced",
		strength: { skillLevel: 12, limitStrength: true, uciElo: 1800 },
		search: { movetime: STANDARD_MOVETIME_MS },
	},
	6: {
		level: 6,
		label: "Expert",
		strength: { skillLevel: 16, limitStrength: true, uciElo: 2200 },
		search: { movetime: STANDARD_MOVETIME_MS },
	},
	7: {
		level: 7,
		label: "Master",
		strength: { limitStrength: false },
		search: { depth: 18 },
	},
};

export const DEFAULT_DIFFICULTY: DifficultyLevel = 4;

export function getDifficultyConfig(level: DifficultyLevel): DifficultyConfig {
	return DIFFICULTY_LEVELS[level];
}
