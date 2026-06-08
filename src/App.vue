<template>
  <div class="app">
    <header class="header">
      <MainNav />
    </header>
    <main class="page-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNav from '@/components/MainNav.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.app {
  font-family: 'Times New Roman', Times, serif;
  background-color: #a95e13;
  color: #222;
  width: 100%;
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}

.page-content {
  flex: 1;
  width: 100%;
}
</style>
