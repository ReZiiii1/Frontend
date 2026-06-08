<template>
  <div class="cart-page">
    <main class="cart-container">
      <h1 class="cart-title">Twoje zamówienie</h1>

      <div v-if="items.length === 0" class="empty-cart">
        <Icon icon="mdi:cart-outline" width="64" height="64" />
        <p>Twój koszyk jest pusty.</p>
        <router-link to="/menu" class="return-btn">Wróć do menu</router-link>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items-list">
          <div v-for="item in items" :key="item.id" class="cart-item">
            <img :src="item.imageUrl" :alt="item.nazwa" class="item-img" />
            
            <div class="item-details">
              <h3>{{ item.nazwa }}</h3>
              <p class="item-price-single">{{ formatPrice(item.parsedPrice) }} zł / szt.</p>
            </div>

            <div class="number-controls">
              <button type="button" class="qty-btn" @click="decrease(item.id)">-</button>
              <span class="qty-number">{{ item.quantity }}</span>
              <button type="button" class="qty-btn" @click="addToCart(item)">+</button>
            </div>

            <div class="item-total-price">
              {{ formatPrice(item.parsedPrice * item.quantity) }} zł
            </div>

            <button type="button" class="remove-btn" @click="removeFromCart(item.id)">
              <Icon icon="mdi:trash-can-outline" width="20" height="20" />
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <h2>Podsumowanie</h2>
          <div class="summary-row">
            <span>Ilość produktów:</span>
            <span>{{ count }} szt.</span>
          </div>
          <div class="summary-row total">
            <span>Do zapłaty:</span>
            <span>{{ formatPrice(total) }} zł</span>
          </div>

          <button 
            type="button" 
            class="checkout-btn" 
            :disabled="isSubmitting"
            @click="submitOrder"
          >
            {{ isSubmitting ? 'Wysyłanie...' : 'Złóż zamówienie' }}
          </button>
          <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useCart } from '@/store/cart';
import { getAuthHeaders } from '@/utils/auth';

const router = useRouter();
const { items, count, total, addToCart, decrease, removeFromCart, clearCart } = useCart();

const isSubmitting = ref(false);
const errorMessage = ref('');

const formatPrice = (val) => new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(val);

async function submitOrder() {
  errorMessage.value = '';
  const orderData = {
    orderItems: items.value.map(item => ({
      itemId: item.id,
      itemType: item.itemType || 'product',
      quantity: item.quantity
    }))
  };

  try {
    isSubmitting.value = true;
    const response = await fetch('https://localhost:7294/api/orders', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Wystąpił problem z serwerem podczas składania zamówienia.');
    }
    
    if (result.success) {
      alert(`Sukces! ${result.message} ID zamówienia: ${result.orderId}. Suma: ${result.totalPrice} zł`);
      clearCart();
      router.push('/');
    }
  } catch (err) {
    errorMessage.value = err.message || 'Brak połączenia z serwerem.';
  }
}
</script>

<style scoped>
.cart-page {
  background-color: #fcf9f5;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', Roboto, sans-serif;
  color: #222;
}

.cart-container {
  max-width: 1100px;
  margin: 0 auto;
}

.cart-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 30px;
  border-left: 5px solid #e30613;
  padding-left: 15px;
}

.empty-cart {
  text-align: center;
  padding: 60px;
  color: #666;
}

.empty-cart p {
  margin: 15px 0 25px;
  font-size: 1.2rem;
}

.return-btn {
  background: #222;
  color: #fff;
  padding: 12px 25px;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

.cart-items-list {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  gap: 15px;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.item-price-single {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.number-controls {
  display: flex;
  align-items: center;
  background: #eee;
  border-radius: 20px;
  overflow: hidden;
}

.qty-btn {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
}

.qty-btn:hover {
  background: #ddd;
}

.qty-number {
  width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-total-price {
  width: 100px;
  text-align: right;
  font-weight: 700;
  color: #e30613;
}

.remove-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #e30613;
}

.cart-summary {
  background: #1e1e1e;
  color: #fff;
  border-radius: 12px;
  padding: 25px;
  height: fit-content;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.cart-summary h2 {
  margin-top: 0;
  font-size: 1.4rem;
  color: #ffc107;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  color: #ccc;
}

.summary-row.total {
  border-top: 1px dashed #444;
  padding-top: 15px;
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
}

.summary-row.total span:last-child {
  color: #e30613;
}

.checkout-btn {
  width: 100%;
  background: #e30613;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.2s;
}

.checkout-btn:hover {
  background: #b00010;
}

.checkout-btn:disabled {
  background: #555;
  cursor: not-allowed;
}

.error-msg {
  color: #ff4d4d;
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
}

@media (max-width: 850px) {
  .cart-content { 
    grid-template-columns: 1fr; 
  }
}
</style>