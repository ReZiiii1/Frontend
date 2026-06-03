<template>
  <article class="menu-card" :class="{ 'locked-card': item.isLocked }" 
  @mouseenter="isHovered = true"
  @mouseleave="isHovered = false">
    <div
      class="item-image"
      :style="{ backgroundImage: `url(${item.imageUrl})` }"
      role="img"
      :aria-label="item.nazwa"
    >
      <div v-if="item.isLocked" class="lock-badge">
        <Icon icon="mdi:lock" width="18" height="18" />
        Klubowicz
      </div>
    </div>
    
    <div class="item-info">
      <h3>{{ item.nazwa }}</h3>
      <p class="description">{{ item.opis }}</p>
      
      <div class="price-row" :class="{ 'flex-column': item.isLocked }">
        <span class="price">
          {{ formatPrice(item.parsedPrice) }} zł
        </span>
        
       <div v-if="!item.isLocked" class="btn-container">
          <Transition name="fade">
            <button 
              v-show="isHovered" 
              type="button" 
              class="add-btn" 
              @click="$emit('add-to-cart', item)"
              title="Dodaj do zamówienia"
            >
              <Icon icon="fe:add-cart" width="24" height="24" />
            </button>
          </Transition>
        </div>

        <button v-else class="login-required-btn" @click="$emit('add-to-cart', item)">
          <Icon icon="fe:add-cart" width="24" height="24" />
          Zaloguj się, aby skorzystać
        </button>
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

defineEmits(['add-to-cart']);

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
  box-shadow: 0 4px 6px rgba(0,0,0,0.05); 
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

.btn-container {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn {
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

.locked-card {
  border: 1px solid #ffeeba;
  background-color: #fffdf6;
}

.lock-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(227, 6, 19, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.flex-column {
  flex-direction: column;
  align-items: flex-start !important;
  gap: 10px;
}

.login-required-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #222;
  color: #fff;
  border: none;
  width: 100%; 
  padding: 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-required-btn:hover {
  background: #e30613; 
}
</style>