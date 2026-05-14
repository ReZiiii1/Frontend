<script setup>
import { ref } from 'vue';
import CategoryNav from './components/CategoryNav.vue';

const CATEGORY_NAMES = [
  'Zupy',
  'Danie główne',
  'Burgery',
  'Dodatki',
  'Dla dzieci',
  'Napoje ciepłe',
  'Napoje zimne',
  'Alkohole',
  'Piwo kuflowe',
];

const categories = CATEGORY_NAMES.map((name) => ({
  id: name,
  name,
}));

const activeCategory = ref(categories[0].id);

function scrollToCategory(id) {
  activeCategory.value = id;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <div class="app">
    <header class="header">
      <CategoryNav 
        :categories="categories" 
        :activeCategory="activeCategory" 
        @change-category="scrollToCategory" 
      />
    </header>
  </div>
</template>

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

#app {
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>