import type { BoardApi } from "vue3-chessboard";
import { ref } from "vue";

import {
	type DifficultyLevel,
	DEFAULT_DIFFICULTY,
	getDifficultyConfig,
} from "@/composables/stockfishDifficulty";
import { uciToMove, useStockfish } from "@/composables/useStockfish";

export interface StockfishOpponentOptions {
	engineUrl?: string;
	difficulty?: DifficultyLevel;
}

export function useStockfishOpponent(
	options: StockfishOpponentOptions = {},
) {
	const boardApi = ref<BoardApi>();
	const difficulty = getDifficultyConfig(
		options.difficulty ?? DEFAULT_DIFFICULTY,
	);

	const { ready, thinking, evalText, requestBestMove } = useStockfish({
		engineUrl: options.engineUrl,
		strength: difficulty.strength,
	});

	function onBoardCreated(api: BoardApi) {
		boardApi.value = api;
	}

	async function onMove() {
		const api = boardApi.value;
		if (!api || !ready.value || api.getIsGameOver()) return;
		if (api.getTurnColor() !== "black") return;

		try {
			const bestMove = await requestBestMove(
				api.getFen(),
				difficulty.search,
			);
			const move = uciToMove(bestMove);
			if (!move || api.getIsGameOver()) return;

			api.move(move);
		} catch (error) {
			console.error("Stockfish failed to reply:", error);
		}
	}

	return {
		difficulty,
		ready,
		thinking,
		evalText,
		onBoardCreated,
		onMove,
	};
}

export type { DifficultyLevel } from "@/composables/stockfishDifficulty";
