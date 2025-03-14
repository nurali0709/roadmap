<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
body {
  background: linear-gradient(135deg, #27364c, #1a2637);
  color: white; /* Optional: Make text readable */
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.5s ease;
}
</style>