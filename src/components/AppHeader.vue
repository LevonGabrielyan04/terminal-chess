<script setup>
defineOptions({
	name: "AppHeader",
});
</script>

<template>
  <div class="terminal__chrome">
    <span class="terminal__dot" aria-hidden="true" />
    <span class="terminal__dot" aria-hidden="true" />
    <span class="terminal__dot" aria-hidden="true" />
    <span class="terminal__title">~/sudo-mate</span>
  </div>
</template>

<style scoped>
.terminal__chrome {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  padding: 0.55rem 0.75rem;
  background: var(--term-chrome);
  border-bottom: 1px solid var(--term-border);
  color: var(--term-mute);
}

.terminal__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #3a3a3a;
}

.terminal__dot:nth-child(1) {
  background: #ff5f56;
}

.terminal__dot:nth-child(2) {
  background: #ffbd2e;
}

.terminal__dot:nth-child(3) {
  background: #27c93f;
}

.terminal__title {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
}
</style>
