<script setup>
defineOptions({
	name: "IndexPage",
});

import TerminalCursor from "../components/TerminalCursor.vue";
</script>

<template>
  <div class="terminal__body">
    <TerminalCursor />
  </div>
</template>

<style scoped>
.terminal__body {
  flex: 1;
  padding: 1rem 1.1rem;
}
</style>
