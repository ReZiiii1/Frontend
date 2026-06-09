<template>
  <div class="navbar-wrapper">
    <nav class="main-nav">
      <div class="nav-content">
        <RouterLink to="/" class="brand-name">MANTICORE</RouterLink>

        <ul class="nav-links" :class="{ open: isNavOpen }">
          <li>
            <RouterLink to="/" @click="closeNav">STRONA GŁÓWNA</RouterLink>
          </li>
          <li>
            <RouterLink to="/menu" @click="closeNav">NASZE MENU</RouterLink>
          </li>
          <li>
            <RouterLink to="/promocje" @click="closeNav">PROMOCJE</RouterLink>
          </li>
          <li>
            <RouterLink to="/restauracje" @click="closeNav">RESTAURACJE</RouterLink>
          </li>
        </ul>

        <div class="nav-right">
          <button 
            v-if="!isLoggedIn"
            type="button" 
            class="order-online-btn"
            @click="isAuthModalOpen = true"
          >
            <Icon icon="fluent-emoji-flat:locked" width="20" />
            ZALOGUJ SIĘ
          </button>

          <button 
            v-else
            type="button" 
            class="order-online-btn logout-btn"
            @click="handleLogout"
          >
            <Icon icon="fluent-emoji-flat:unlocked" width="20" />
            WYLOGUJ ({{ userEmail.split('@')[0] }})
          </button>

          <button
            type="button"
            class="menu-toggle"
            aria-label="Menu"
            @click="isNavOpen = !isNavOpen"
          >
            <Icon
              :icon="isNavOpen ? 'material-symbols:close' : 'material-symbols:menu'"
              width="32"
            />
          </button>
        </div>
      </div>
    </nav>

    <AuthModal 
      v-if="isAuthModalOpen" 
      @close="isAuthModalOpen = false"
      @auth-success="handleAuthSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import AuthModal from './AuthModal.vue'
import { isLoggedIn as hasAuthToken, getUserEmail, saveAuth, clearAuth } from '@/utils/auth'

const isNavOpen = ref(false)
const isAuthModalOpen = ref(false)
const isLoggedIn = ref(false)
const userEmail = ref('')

function closeNav() {
  isNavOpen.value = false
}

onMounted(() => {
  checkLoginStatus()
  window.addEventListener('storage', checkLoginStatus)
})

function checkLoginStatus() {
  if (hasAuthToken()) {
    isLoggedIn.value = true
    userEmail.value = getUserEmail()
  } else {
    isLoggedIn.value = false
    userEmail.value = ''
  }
}

function handleAuthSuccess(userData: { email: string; token: string }) {
  isAuthModalOpen.value = false
  saveAuth(userData)
  checkLoginStatus()
  alert(`Zalogowano pomyślnie jako: ${userData.email}`)
  window.dispatchEvent(new Event('storage'))
}

function handleLogout() {
  clearAuth()
  checkLoginStatus()
  alert('Wylogowano z restauracji Manticore.')
  window.dispatchEvent(new Event('storage'))
}
</script>

<style scoped>
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

.brand-name {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  color: #ffc107;
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.nav-links a:hover,
.nav-links a.router-link-active {
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
  transition: background-color 0.2s;
}

.order-online-btn:hover {
  background-color: #b00010;
}

.logout-btn {
  background-color: #4a3b2c;
  border: 1px solid #e30613;
}

.logout-btn:hover {
  background-color: #e30613;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 900px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: #3a2613;
    padding: 16px;
    gap: 12px;
    z-index: 101;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-content {
    position: relative;
  }
}
</style>