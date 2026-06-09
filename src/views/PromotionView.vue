<template>
  <div class="promotions-page">
    <header class="promotions-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Wyjątkowe Promocje <span class="brand-name">Manticore</span></h1>
        <p class="hero-subtitle">Super oferty w niższych cenach. Wybierz coś dla siebie i zamawiaj taniej!</p>
      </div>
    </header>

    <div class="promotions-container">
      <p v-if="loading" class="status-msg">Ładowanie promocji…</p>
      <p v-else-if="error" class="status-msg-error">{{ error }}</p>

      <template v-else>
        <div class="promotions-grid">
          <MenuCard 
            v-for="promo in basicPromotions" 
            :key="promo.id" 
            :item="promo"
          >
            <template #actions="{ item: slotItem, hovered }">
              <Transition name="fade">
                <button
                  v-show="hovered"
                  type="button"
                  class="add-btn"
                  @click="handleAddToCart(slotItem)"
                >
                  <Icon icon="fe:add-cart" width="24" height="24" />
                </button>
              </Transition>
            </template>
          </MenuCard>
        </div>

        <div v-if="showMore" class="premium-section">
          <div class="section-divider">
            <span>Strefa Klubowicza Manticore</span>
          </div>
          
          <div class="promotions-grid">
            <PromotionCard 
              v-for="promo in premiumPromotions" 
              :key="promo.id" 
              :item="promo"
            >
              <template #actions="{ item: slotItem, hovered }">
                <Transition name="fade">
                  <button
                    v-show="hovered"
                    type="button"
                    class="add-btn"
                    @click="handlePremiumClick(slotItem)"
                  >
                    <Icon :icon="slotItem.isLocked ? 'mdi:lock' : 'fe:add-cart'" width="24" />
                  </button>
                </Transition>
              </template>
            </PromotionCard>
          </div>
        </div>

        <div class="actions-row" v-if="!showMore">
          <button class="show-more-btn" @click="showMore = true">
            Pokaż więcej promocji
            <Icon icon="mdi:chevron-down" width="20" height="20" />
          </button>
        </div>
      </template>
    </div>

    <CartPopup />

    <AuthModal 
      v-if="isAuthModalOpen" 
      @close="isAuthModalOpen = false"
      @auth-success="handleAuthSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MenuCard from '@/components/MenuCard.vue';
import PromotionCard from '@/components/PromotionCard.vue';
import AuthModal from '@/components/AuthModal.vue';
import CartPopup from '@/components/CartPopup.vue';
import { Icon } from '@iconify/vue';
import { useCart } from '@/store/cart';
import { isLoggedIn, saveAuth, getAuthHeaders } from '@/utils/auth';

const cart = useCart();

const showMore = ref(false);
const isAuthModalOpen = ref(false);
const loading = ref(true);
const error = ref('');
const basicPromotions = ref([]);
const premiumPromotions = ref([]);

async function loadPromotions() {
  loading.value = true;
  error.value = '';

  try {
    const [basicRes, premiumRes] = await Promise.all([
      fetch('https://localhost:7294/api/promotions'),
      fetch('https://localhost:7294/api/promotions/premium', { headers: getAuthHeaders() }),
    ]);

    if (!basicRes.ok || !premiumRes.ok) {
      throw new Error('Nie udało się pobrać promocji z serwera.');
    }

    basicPromotions.value = await basicRes.json();
    premiumPromotions.value = await premiumRes.json();
  } catch (err) {
    error.value = err.message || 'Brak połączenia z serwerem bazy danych.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadPromotions();
  window.addEventListener('storage', loadPromotions);
});

const handleAddToCart = (item) => {
  cart.addToCart(item);
};

const handlePremiumClick = (item) => {
  if (isLoggedIn() && !item.isLocked) {
    cart.addToCart(item);
  } else {
    isAuthModalOpen.value = true;
  }
};

const handleAuthSuccess = (userData) => {
  isAuthModalOpen.value = false;
  saveAuth(userData);
  loadPromotions();
  window.dispatchEvent(new Event('storage'));
  alert('Witaj w klubie Manticore! Wszystkie promocje zostały odblokowane.');
};
</script>

<style scoped>
.promotions-page {
  background-color: #fcf9f5; 
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.promotions-hero {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  padding: 80px 20px;
  text-align: center;
  color: #fff;
  box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, rgba(34, 34, 34, 0.85) 0%, rgba(20, 20, 20, 0.9) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.promotions-hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.brand-name {
  color: #ffc107; 
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #ddd;
  font-weight: 300;
  line-height: 1.6;
}

.promotions-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
}

.promotions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 35px;
}

.status-msg {
  text-align: center;
  padding: 20px;
  color: #666;
}

.status-msg-error {
  text-align: center;
  padding: 20px;
  color: #e30613;
  font-weight: bold;
}

.actions-row {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.show-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #222;
  color: #fff;
  border: 2px solid #222;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.show-more-btn:hover {
  background-color: transparent;
  color: #222;
  transform: translateY(-2px);
}

.premium-section {
  margin-top: 60px;
  animation: fadeIn 0.5s ease-in-out;
}

.section-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
}

.section-divider::before, .section-divider::after {
  content: '';
  flex: 1;
  border-bottom: 2px dashed #ccc;
}

.section-divider:not(:empty)::before {
  margin-right: .5em;
}

.section-divider:not(:empty)::after {
  margin-left: .5em;
}

.section-divider span {
  font-size: 1.3rem;
  font-weight: 700;
  color: #e30613;
  background: #fcf9f5;
  padding: 0 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>