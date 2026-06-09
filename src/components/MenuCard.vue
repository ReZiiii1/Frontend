<template>
  <article 
    class="menu-card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    >
    <div
      class="item-image"
      :style="{ backgroundImage: `url(${item.imageUrl})` }"
      >
      <slot name="badge" />
    </div>
    <div class="item-info">
      <h3>{{ item.nazwa }}</h3>
      <p class="description">{{ item.opis }}</p>
      <div class="price-row">
        <span class="price">{{ formatPrice(item.parsedPrice) }} zł</span>
        <slot
          name="actions"
          :item="item"
          :hovered="isHovered" 
          />
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  item: { type: Object, required: true }
});

const emit = defineEmits(['add-to-cart']);

const isHovered = ref(false);

const formatPrice = (val) => new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(val);
</script>

<style scoped>
.menu-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease; 
}

.menu-card:hover {
  transform: translateY(-4px);
}

.item-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 12px 12px 0 0;
}

.item-info {
  padding: 15px;
}

.item-info h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: #222;
}

.description {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.45;
  margin: 0;
  min-height: 2.6em; 
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  min-height: 40px; 
}

.price {
  font-weight: 800;
  color: #e30613;
  font-size: 0.95rem;
}

:deep(.add-btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e30613;
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.add-btn:hover {
  background: #b00010;
  transform: scale(1.1);
}

.add-btn:active {
  transform: scale(0.9);
}
</style>