<script setup>
import { ref, computed, onMounted } from 'vue';
import CategoryNav from './components/CategoryNav.vue';
import MenuCard from './components/MenuCard.vue';

const apiBase = 'https://localhost:7294';
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

const productsRaw = ref([]);
const menuLoading = ref(true);
const menuError = ref('');
const activeCategory = ref(categories[0].id);

const menuData = computed(() => {
  const normalize = (v) => (v ?? '').trim().toLowerCase();
  
  return CATEGORY_NAMES.map(name => ({
    id: name,
    categoryName: name,
    items: productsRaw.value
      .filter(p => normalize(p.kategoria) === normalize(name))
      .map(p => ({
        ...p,
        parsedPrice: typeof p.cena === 'number' 
          ? p.cena 
          : parseFloat(String(p.cena).replace(',', '.')),
        imageUrl: p.zdjecie ? `${apiBase}/images/${p.zdjecie}`: null,
      }))
  }));
});

async function loadMenu() {
  menuLoading.value = true;
  menuError.value = '';
  try {
    const res = await fetch(`${apiBase}/api/menu`);
    if (!res.ok) throw new Error();
    productsRaw.value = await res.json();
  } catch {
    menuError.value = 'Brak połączenia z serwerem bazy danych.';
  } finally {
    menuLoading.value = false;
  }
}

function scrollToCategory(id) {
  activeCategory.value = id;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(loadMenu);
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
    <main class="menu-container">
      <p v-if="menuLoading" class="menu-status">Ładowanie menu…</p>
      <p v-else-if="menuError" class="menu-status-error">{{ menuError }}</p>

      <section 
        v-for="cat in menuData" 
        :key="cat.id" 
        :id="cat.id" 
        class="category-section"
      >
        <h2 class="category-title">{{ cat.categoryName }}</h2>

        <div class="items-grid">
          <MenuCard
            v-for="item in cat.items" 
            :key="item.id" 
            :item="item"
          />
        </div>
      </section>
    </main>
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
  top: 70px;
  z-index: 100;
  background: #fff;
}

.menu-container {
  max-width: 1200px;
  padding: 15px 15px;
}

.category-section {
  scroll-margin-top: 150px; 
}

.category-title {
  margin: 24px 0 16px;
  font-size: 1.25rem;
  border-left: 4px solid #e30613;
  padding-left: 10px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.menu-status {
  text-align: center;
  padding: 20px;
  color: #666;
}

.menu-status-error {
  color: #e30613;
}

#app {
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>