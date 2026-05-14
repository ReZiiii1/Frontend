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