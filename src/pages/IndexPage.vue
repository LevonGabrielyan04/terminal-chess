<script setup>
defineOptions({
	name: "IndexPage",
});

import TerminalChessboard from "../components/chess/TerminalChessboard.vue";
import TerminalCursor from "../components/TerminalCursor.vue";
</script>

<template>
  <div class="terminal__body">
    <TerminalChessboard />
    <div class="terminal__prompt">
      <TerminalCursor />
    </div>
  </div>
</template>

<style scoped>
.terminal__body {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 1rem 1.1rem;
  min-height: 0;
  height: fit-content;
  margin: auto 0 auto 0;
}

.terminal__prompt {
  flex: 0 1 16rem;
  min-width: 0;
  align-self: flex-end;
  margin-bottom: 1rem;
}
</style>
