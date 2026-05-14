<template>
<div class="app">
    <header class="header">
      <nav class="main-nav">
        <div class="nav-content">
          <div class="logo-section">
            <span class="brand-name">MANTICORE</span>
          </div>

          <ul class="nav-links">
            <li><a href="#" @click.prevent="currentPage = 'home'">STRONA GŁÓWNA</a></li>
            <li><a href="#" @click.prevent="currentPage = 'menu'">NASZE MENU</a></li>
            <li><a href="#" @click.prevent>PROMOCJE</a></li>
            <li><a href="#" @click.prevent>RESTAURACJE</a></li>
            <li><a href="#" @click.prevent>O NAS</a></li>
          </ul>

          <div class="nav-right">
            <button class="order-online-btn">
              <Icon icon="ic:round-shopping-basket" width="20" />
              ZAMÓW ONLINE
            </button>
            <button class="menu-toggle" @click="isMenu = !isMenu">
              <Icon :icon="isMenu ? 'material-symbols:close' : 'material-symbols:menu'" width="32" />
            </button>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <div v-if="currentPage === 'home'" class="hero-section">
      </div>

      <Menu v-else-if="currentPage === 'menu'"/>
    </main>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Icon } from "@iconify/vue";
import Menu from './Menu.vue';

const currentPage = ref('home'); 
const isMenuOpen = ref(false);
</script>

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

.main-nav {
  background-color: #3a2613;
  color: white;
  border-bottom: 3px solid #e30613;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-name {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 25px;
  margin: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.nav-links a:hover {
  color: #e30613;
}

.order-online-btn {
  background-color: #e30613;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
}
</style>