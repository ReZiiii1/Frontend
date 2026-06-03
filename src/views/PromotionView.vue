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
      <div class="promotions-grid">
        <PromotionCard 
          v-for="promo in basicPromotions" 
          :key="promo.id" 
          :item="promo"
          @add-to-cart="handleAddToCart"
        />
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
            @add-to-cart="handlePremiumClick"
          />
        </div>
      </div>

      <div class="actions-row" v-if="!showMore">
        <button class="show-more-btn" @click="showMore = true">
          Pokaż więcej promocji
          <Icon icon="mdi:chevron-down" width="20" height="20" />
        </button>
      </div>
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
import PromotionCard from '@/components/PromotionCard.vue';
import AuthModal from '@/components/AuthModal.vue';
import CartPopup from '@/components/CartPopup.vue';
import { Icon } from '@iconify/vue';
import { useCart } from '@/store/cart';

const { addToCart } = useCart();

const showMore = ref(false);
const isAuthModalOpen = ref(false);
const isLoggedIn = ref(false);

const basicPromotions = ref([
  {
    id: 1,
    nazwa: "Zestaw dla dziecka",
    opis: "Nuggetsy z frytkami i colą 0,33l w super cenie. Idealny zestaw dla najmłodszych smakoszy.",
    parsedPrice: 30.49,
    imageUrl: "https://heisenburger.pl/uploads/images/products/org/11.jpg",
    isLocked: false 
  },
  {
    id: 2,
    nazwa: "2x Burger Wege",
    opis: "Zniżka 30% na drugiego burgera Wege.",
    parsedPrice: 53.35,
    imageUrl: "https://www.frosta.pl/wp-content/uploads/sites/4/2020/11/shutterstock_794244805_Wege-burger-z-guacamole-scaled.jpg",
    isLocked: false
  },
  {
    id: 3,
    nazwa: "Chrupiący Box Przekąsek",
    opis: "Frytki, kurczaczki w sosie ostrym, krązki cebulowe i 2 autorskie sosy.",
    parsedPrice: 34.99,
    imageUrl: "https://papupos.s3.amazonaws.com/media/company/143b6abe-d23b-406d-854d-1a2412edd69d/images/c41d545b-542a-4492-a7e4-dd5f01e5be11.png",
    isLocked: false
  }
]);

const premiumPromotions = ref([
  {
    id: 4,
    nazwa: "Łosoś Grillowany",
    opis: "Zniżka 9zł na najpyszniejszą rybę w Polsce. Oferta dla klubowiczów.",
    parsedPrice: 43.00,
    imageUrl: "https://saproduwielbiaplmmedia.blob.core.windows.net/media/recipes/images/1699973472780.jpeg",
    isLocked: true 
  },
  {
    id: 5,
    nazwa: "Frytki z batata",
    opis: "Zniżka 5zł na słodkie chrupiące frytki z batata. Oferta dla klubowiczów.",
    parsedPrice: 9.00,
    imageUrl: "https://az.przepisy.pl/www-przepisy-pl/www.przepisy.pl/przepisy3ii/img/variants/800x0/frytki_z_marchewki_0994803.jpg",
    isLocked: true
  },
  {
    id: 6,
    nazwa: "Burger klasyczny XL",
    opis: "Powiększony o 80gr mięsa burger klasyczny. Oferta dla klubowiczów.",
    parsedPrice: 32.99,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    isLocked: true
  }
]);

onMounted(() => {
  checkLoginStatus();
  window.addEventListener('storage', checkLoginStatus);
});

function checkLoginStatus() {
  const savedEmail = localStorage.getItem('manticore_user');
  if (savedEmail) {
    isLoggedIn.value = true;
    premiumPromotions.value.forEach(promo => {
      promo.isLocked = false;
    });
  } else {
    isLoggedIn.value = false;
    premiumPromotions.value.forEach(promo => {
      promo.isLocked = true;
    });
  }
}

const handleAddToCart = (item) => {
  addToCart(item);
};

const handlePremiumClick = (item) => {
  if (isLoggedIn.value) {
    addToCart(item);
  } else {
    isAuthModalOpen.value = true;
  }
};

const handleAuthSuccess = (userData) => {
  isAuthModalOpen.value = false;
  localStorage.setItem('manticore_user', userData.email);
  checkLoginStatus();
  window.dispatchEvent(new Event('storage'));
  alert(`Witaj w klubie Manticore! Wszystkie promocje zostały odblokowane.`);
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