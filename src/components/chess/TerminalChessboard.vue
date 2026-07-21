<script setup lang="ts">
import type { BoardConfig } from "vue3-chessboard";
import { TheChessboard } from "vue3-chessboard";

import { useStockfishOpponent } from "@/composables/useStockfishOpponent";

import "chessground/assets/chessground.base.css";
import "@/assets/chess/chess-layout.css";
import "@/assets/chess/terminal-chess.css";

defineOptions({
	name: "TerminalChessboard",
});

const { ready, thinking, evalText, onBoardCreated, onMove } =
	useStockfishOpponent();

const boardConfig: BoardConfig = {
	coordinates: true,
	animation: {
		enabled: true,
		duration: 150,
	},
	movable: {
		color: "white",
	},
};
</script>

<template>
  <section class="terminal-chess" aria-label="Chess board">
    <TheChessboard
      :board-config="boardConfig"
      @board-created="onBoardCreated"
      @move="onMove"
    />

    <footer class="terminal-chess__status" aria-live="polite">
      <span v-if="!ready" class="terminal-chess__status-line">stockfish › booting…</span>
      <span v-else-if="thinking" class="terminal-chess__status-line">stockfish › thinking…</span>
      <span v-else class="terminal-chess__status-line">
        stockfish › ready<span v-if="evalText"> · eval {{ evalText }}</span>
      </span>
    </footer>
  </section>
</template>

<style scoped>
.terminal-chess__status {
	margin-top: 0.55rem;
	font-family: var(--term-mono, ui-monospace, monospace);
	font-size: 0.72rem;
	line-height: 1.4;
	color: var(--term-mute, #6a6a6a);
	letter-spacing: 0.02em;
}

.terminal-chess__status-line {
	display: block;
}
</style>
