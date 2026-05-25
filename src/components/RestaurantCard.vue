<template>
  <article class="restaurant-card">
    <div
      class="item-image"
      :style="{ backgroundImage: `url(${item.imageUrl || item.zdjecie})` }"
      role="img"
      :aria-label="item.miejscowosc"
    ></div>
    <div class="place-info">
      <h3>{{ item.miejscowosc }}</h3>
      <p class="localization">
        {{ item.ulica }} {{ item.nr_budynku }}{{ item.nr_lokalu ? `/${item.nr_lokalu}` : '' }}
      </p>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  item: { 
    type: Object, 
    required: true 
  }
});
</script>

<style scoped>
.restaurant-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.restaurant-card:hover {
  transform: translateY(-4px);
}

.item-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  width: 100%;
}

.place-info {
  padding: 15px;
}

.place-info h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: #222;
  font-family: 'Times New Roman', serif;
}

.localization {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.45;
  margin: 0 0 15px 0;
}
</style>
