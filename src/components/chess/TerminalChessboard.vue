<script setup lang="ts">
import type { BoardConfig } from "vue3-chessboard";
import { TheChessboard } from "vue3-chessboard";

import "chessground/assets/chessground.base.css";
import "@/assets/chess/chess-layout.css";
import "@/assets/chess/terminal-chess.css";

defineOptions({
	name: "TerminalChessboard",
});

const boardConfig: BoardConfig = {
	coordinates: true,
	animation: {
		enabled: true,
		duration: 150,
	},
};
</script>

<template>
  <section class="terminal-chess" aria-label="Chess board">
    <TheChessboard :board-config="boardConfig" />
  </section>
</template>
