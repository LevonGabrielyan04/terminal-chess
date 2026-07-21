import type { StockfishStrengthConfig } from "@/composables/stockfishDifficulty";
import { computed, onUnmounted, ref, shallowRef } from "vue";

const DEFAULT_ENGINE_URL = "/stockfish/stockfish-18-lite-single.js";

export interface StockfishSearchOptions {
	depth?: number;
	movetime?: number;
}

export interface UseStockfishOptions {
	engineUrl?: string;
	strength?: StockfishStrengthConfig;
}

function applyStrength(
	send: (command: string) => void,
	strength?: StockfishStrengthConfig,
) {
	if (!strength) return;

	if (strength.skillLevel !== undefined) {
		send(`setoption name Skill Level value ${strength.skillLevel}`);
	}

	send(`setoption name UCI_LimitStrength value ${strength.limitStrength}`);

	if (strength.limitStrength && strength.uciElo !== undefined) {
		send(`setoption name UCI_Elo value ${strength.uciElo}`);
	}
}

export function useStockfish(options: UseStockfishOptions = {}) {
	const engineUrl = options.engineUrl ?? DEFAULT_ENGINE_URL;
	const strength = options.strength;
	const ready = ref(false);
	const thinking = ref(false);
	const evalCp = ref<number | null>(null);
	const evalMate = ref<number | null>(null);

	const worker = shallowRef<Worker | null>(null);

	let pendingResolve: ((move: string) => void) | null = null;
	let pendingReject: ((error: Error) => void) | null = null;

	const evalText = computed(() => {
		if (evalMate.value !== null) {
			const sign = evalMate.value > 0 ? "+" : "";
			return `#${sign}${evalMate.value}`;
		}
		if (evalCp.value === null) return null;
		const pawns = evalCp.value / 100;
		const sign = pawns > 0 ? "+" : "";
		return `${sign}${pawns.toFixed(2)}`;
	});

	function send(command: string) {
		worker.value?.postMessage(command);
	}

	function clearPending(error?: Error) {
		if (error) pendingReject?.(error);
		pendingResolve = null;
		pendingReject = null;
	}

	function handleEngineLine(line: string) {
		if (line === "uciok") {
			applyStrength(send, strength);
			send("isready");
			return;
		}

		if (line === "readyok") {
			ready.value = true;
			return;
		}

		if (line.startsWith("info ")) {
			const cp = line.match(/\bscore cp (-?\d+)/)?.[1];
			if (cp) {
				evalCp.value = Number(cp);
				evalMate.value = null;
			}

			const mate = line.match(/\bscore mate (-?\d+)/)?.[1];
			if (mate) {
				evalMate.value = Number(mate);
				evalCp.value = null;
			}
			return;
		}

		if (line.startsWith("bestmove ")) {
			const move = line.split(" ")[1] ?? "(none)";
			thinking.value = false;
			pendingResolve?.(move);
			clearPending();
		}
	}

	function init() {
		const engineWorker = new Worker(engineUrl);
		worker.value = engineWorker;

		engineWorker.onmessage = (event: MessageEvent<string>) => {
			handleEngineLine(event.data);
		};

		engineWorker.onerror = (event) => {
			thinking.value = false;
			clearPending(new Error(event.message || "Stockfish worker failed"));
		};

		send("uci");
	}

	function requestBestMove(
		fen: string,
		options: StockfishSearchOptions = { movetime: 800 },
	): Promise<string> {
		if (!ready.value) {
			return Promise.reject(new Error("Stockfish is not ready yet"));
		}

		if (pendingResolve) {
			return Promise.reject(new Error("Stockfish is already searching"));
		}

		return new Promise((resolve, reject) => {
			pendingResolve = resolve;
			pendingReject = reject;
			thinking.value = true;
			evalCp.value = null;
			evalMate.value = null;

			send(`position fen ${fen}`);

			if (options.movetime) {
				send(`go movetime ${options.movetime}`);
			} else {
				send(`go depth ${options.depth ?? 15}`);
			}
		});
	}

	init();

	onUnmounted(() => {
		send("stop");
		send("quit");
		worker.value?.terminate();
		worker.value = null;
		clearPending();
	});

	return {
		ready,
		thinking,
		evalCp,
		evalMate,
		evalText,
		requestBestMove,
	};
}

export function uciToMove(uci: string) {
	if (uci === "(none)" || uci.length < 4) return null;

	return {
		from: uci.slice(0, 2),
		to: uci.slice(2, 4),
		...(uci[4] ? { promotion: uci[4] } : {}),
	};
}
