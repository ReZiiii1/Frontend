<template>
  <nav class="categories-nav">
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="cat-btn"
      :class="{ active: activeCategory === cat.id }"
      @click="$emit('change-category', cat.id)"
    >
      {{ cat.name }}
    </button>
  </nav>
</template>

<script setup>
defineProps({
  categories: Array,
  activeCategory: String
});
defineEmits(['change-category']);
</script>

<style scoped>
.categories-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background-color: #24160a;
  width: 100%;
  border-bottom: 3px solid #e30613;
}

.cat-btn {
  flex: 1 1 0;
  border: none;
  font-family: 'Times New Roman', serif;
  font-size: 0.75rem;  
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 15px 5px; 
  color: #d1d1d1;
  transition: all 0.3s ease;
  text-align: center;    
  background-color: rgba(255, 255, 255, 0.03);
}
</style>