<template>
<Transition name="slide-fade">
    <div v-if="count > 0" class="cart-popup">
        <div class="popup-header">
            <div class="cart-title">
                <Icon icon="mdi:cart" width="22" height="22" />
                <span>Twoje zamówienie</span>
            </div>
        <span class="items-count">{{ count }} szt.</span>
        </div>

        <div class="total-row">
            <span>Suma:</span>
            <span class="total-price">{{ formatPrice(total) }} zł</span>
        </div>

        <div class="popup-actions">
            <button class="go-to-cart-btn" @click="handleGoToCart">
            Przejdź do koszyka
            <Icon icon="raphael:cart" width="22" height="22" />
            </button>
        </div>
    </div>
</Transition>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useCart } from '@/store/cart';

const router = useRouter();
const { items, count, total } = useCart();

const formatPrice = (val) => new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(val);

const handleGoToCart = () => {
    router.push('/cart');
};
</script>

<style scoped>
.cart-popup {
    position: fixed;
    top: 90px;
    right: 30px;
    z-index: 100;
    width: 300px;
    background: #1e1e1e;
    color: #ffffff;
    border-radius: 12px;
    border: 1px solid #333;
    padding: 20px;
    font-family: 'Times New Roman', serif;
    font-size: 1.1rem;
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding-bottom: 12px;
}

.cart-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    color: #ffc107;
}

.items-count {
    background: #e30613; 
    font-size: 0.8rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
    padding: 16px 0;
}

.total-price {
    font-weight: 800;
    color: #e30613;
    font-size: 1.1rem;
}

.go-to-cart-btn {
    width: 100%;
    background: #e30613;
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    gap: 5px;
    transition: background 0.2s, transform 0.2s;
}

.go-to-cart-btn:hover {
    background: #b00010;
    transform: translateY(-2px);
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from{
    transform: translateX(50px);
    opacity: 0;
}
</style>