<script setup>
import AppHeader from "./components/AppHeader.vue";
import IndexPage from "./pages/IndexPage.vue";
</script>

<template>
  <div class="terminal">
    <header>
      <AppHeader />
    </header>
    <IndexPage />
  </div>
</template>

<style scoped>
.terminal {
  --term-bg: #0c0c0c;
  --term-fg: #d4d4d4;
  --term-mute: #6a6a6a;
  --term-accent: #7ec699;
  --term-chrome: #161616;
  --term-border: #2a2a2a;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  background: var(--term-bg);
  color: var(--term-fg);
  font-family:
    "JetBrains Mono", "Cascadia Code", "SF Mono", ui-monospace, Menlo, Consolas,
    monospace;
  font-size: 0.875rem;
  line-height: 1.55;
  border: 1px solid var(--term-border);
}
</style>
