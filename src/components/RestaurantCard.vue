<template>
  <article class="restaurant-card">
    <div
      class="item-image"
      :style="{ backgroundImage: `url(${item.imageUrl || item.zdjecie})` }"
      role="img"
      :aria-label="item.miejscowosc"
    ></div>

    <div class="place-info">
      
        <div>
            <h3>{{ item.miejscowosc }}</h3>
            <p class="localization">
                {{ item.ulica }} {{ item.nr_budynku }}{{ item.nr_lokalu ? `/${item.nr_lokalu}` : '' }}
            </p>
        </div>
    
        <div class="navigation-container">
            <a 
                v-if="item.szerokosc_geo && item.dlugosc_geo"
                :href="`https://www.google.com/maps/search/?api=1&query=${item.szerokosc_geo},${item.dlugosc_geo}`"
                target="_blank"
                rel="noopener noreferrer"
                class="nav-button"
            >
            <Icon icon="gis:route" color="white" width="27" height="27" />
            </a>
        </div>
    </div>
  </article>
</template>

<script setup>
import { Icon } from '@iconify/vue';

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
  position: relative;
}

.restaurant-card:hover {
  transform: translateY(-4px);
}

.item-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  width: 100%;
  position: relative;
}

.place-info {
  padding: 15px;
  display: flex;
  align-items: center;       
  justify-content: space-between; 
  gap: 15px;                 
  flex-grow: 1;
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
  margin: 0;
}

.navigation-container {
  opacity: 0;                
  transform: translateX(15px); 
  transition: opacity 0.3s ease, transform 0.3s ease;
}


.restaurant-card:hover .navigation-container {
  opacity: 1;
  transform: translateX(0);
}

.nav-button {
  background-color: #e30613;
  color: white;
  width:50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.nav-button:hover {
  background-color: #b8050f;
  transform: scale(1.1);
}
</style>