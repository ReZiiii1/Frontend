import { ref, computed } from 'vue';

const cartItems = ref([]);

export function useCart() {
  const items = computed(() => cartItems.value);
  const count = computed(() => cartItems.value.length);
  const total = computed(() => cartItems.value.reduce((sum, item) => sum + item.parsedPrice, 0));

  function addToCart(item) {
    cartItems.value.push(item);
  }

  function removeFromCart(index) {
    cartItems.value.splice(index, 1);
  }

  function clearCart() {
    cartItems.value = [];
  }

  return {
    items,
    count,
    total,
    addToCart,
    removeFromCart,
    clearCart
  };
}