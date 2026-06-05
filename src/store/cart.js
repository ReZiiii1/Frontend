import { ref, computed } from 'vue';

const cartItems = ref([]);

export function useCart() {
  const items = computed(() => cartItems.value);
  const count = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0));
  const total = computed(() => cartItems.value.reduce((sum, item) => sum + (item.parsedPrice * item.quantity), 0));

  function addToCart(product) {
    const existingItem = cartItems.value.find(i => i.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  }

  function decrease(productId) {
    const existingItem = cartItems.value.find(i => i.id === productId);
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity <= 0) {
        removeFromCart(productId);
      }
    }
  }

  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter(i => i.id !== productId);
  }

  function clearCart() {
    cartItems.value = [];
  }

  return {
    items,
    count,
    total,
    addToCart,
    decrease,
    removeFromCart,
    clearCart
  };
}