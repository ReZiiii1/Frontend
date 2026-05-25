<script setup>
import { ref, computed, onMounted } from 'vue';
import RestaurantCard from './components/RestaurantCard.vue';
import RestaurantSearch from './components/RestaurantSearch.vue';
import {Icon} from '@iconify/vue';

const apiBase = 'https://localhost:7294';

const restaurants = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const error = ref('');

const filteredRestaurants = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  
  if (!query) return restaurants.value; 

  return restaurants.value.filter(r => {
    return r.miejscowosc && r.miejscowosc.toLowerCase().includes(query);
  });
});

async function loadRestaurants() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${apiBase}/api/Restaurant`);
    if (!res.ok) throw new Error();

    const data = await res.json();

    restaurants.value = data.map(r => ({
      ...r,
      imageUrl: r.zdjecie || null
    }));
  } catch {
    error.value = 'Brak połączenia z serwerem bazy danych.';
  } finally {
    loading.value = false;
  }
}

onMounted(loadRestaurants);
</script>

<template>
  <div class="app">

    <section class="hero">
      <p class="hero-line">Znajdź swoją ulubioną restaurację w okolicy!</p>
      <RestaurantSearch v-model="searchQuery" />
    </section>

    <main class="restaurants-container">
      <p v-if="loading" class="status-msg">Ładowanie listy restauracji…</p>
      <p v-else-if="error" class="status-msg-error">{{ error }}</p>

      <div v-else>
        <p v-if="filteredRestaurants.length === 0" class="status-msg no-results">
          Nie znaleźliśmy żadnej restauracji w wyszukiwanej przez ciebie miejscowości. <Icon icon="pixel:face-sad-solid" color="white" width="15" />
        </p>

      <div v-else class="items-grid">
        <RestaurantCard
          v-for="restaurant in filteredRestaurants" 
          :key="restaurant.id" 
          :item="restaurant"
        />
      </div>
      </div>
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

.hero {
  background: #6c3c0c;
  color: #fff;
  text-align: center;
  padding: 15px;
  border-bottom: 3px solid #e30613;
}

.hero-line {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
}

.restaurants-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 15px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.status-msg {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 1.1rem;
}

.status-msg-error {
  font-size: 1.3rem;
  text-align: center;
  padding: 20px;
  color: #e30613;
  font-weight: bold;
}
</style>