<script setup lang="ts">
import { onMounted, ref } from "vue";

const input = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

function onPaste(event: ClipboardEvent) {
	const text = event.clipboardData?.getData("text") ?? "";
	input.value += text.replace(/\r?\n/g, "");
}

function focusInput() {
	inputRef.value?.focus();
}

function onBlur() {
	requestAnimationFrame(focusInput);
}

onMounted(() => {
	focusInput();
});
</script>

<template>
  <p class="terminal-cursor-line" @click="focusInput">
    <span class="terminal-cursor-line__prompt">$</span>
    <span class="terminal-cursor-line__input-wrap">
      <input
        ref="inputRef"
        v-model="input"
        type="text"
        class="terminal-cursor-line__input"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        aria-label="Terminal input"
        @keydown.enter.prevent
        @paste.prevent="onPaste"
        @blur="onBlur"
      />
    </span>
  </p>
</template>

<style scoped>
.terminal-cursor-line {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  outline: none;
  cursor: text;
}

.terminal-cursor-line__prompt {
  color: var(--term-accent, #7ec699);
  user-select: none;
}

.terminal-cursor-line__input-wrap {
  display: inline-flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.terminal-cursor-line__input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--term-fg, #d4d4d4);
  font: inherit;
  line-height: inherit;
  white-space: pre;
  caret-color: var(--term-accent, #7ec699);
}
</style>
