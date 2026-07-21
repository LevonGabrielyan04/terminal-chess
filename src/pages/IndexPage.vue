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
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  gap: 1.25rem;
  padding: 1rem 1.1rem;
}

.terminal__prompt {
  flex: 1;
  min-width: 0;
}
</style>
