<script setup>
import { ref, onMounted } from 'vue';
import RestaurantCard from './components/RestaurantCard.vue';

const apiBase = 'https://localhost:7294';

const restaurants = ref([]);
const loading = ref(true);
const error = ref('');

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
    </section>

    <main class="restaurants-container">
      <p v-if="loading" class="status-msg">Ładowanie listy restauracji…</p>
      <p v-else-if="error" class="status-msg-error">{{ error }}</p>

      <div v-else class="items-grid">
        <RestaurantCard
          v-for="restaurant in restaurants" 
          :key="restaurant.id" 
          :item="restaurant"
        />
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
  color: #fff;
}

.status-msg-error {
  text-align: center;
  padding: 20px;
  color: #e30613;
  font-weight: bold;
}
</style>