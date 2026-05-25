<template>
    <header class="search-header">
        <div class="search-box">
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Wpisz nazwę miejscowości..."
                class="search-input"
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn"><Icon icon="lucide:delete" /></button>
        </div>
    </header>
</template>

<script setup>
import {Icon} from '@iconify/vue';
const searchQuery = defineModel({ type: String, default: '' });
</script>

<style scoped>
.search-header {
  background: #6c3c0c;
  color: #fff;
  text-align: center;
  padding: 10px 15px;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 15px;
  font-size: 1.1rem;
  background-color: #ffffff;
  color: #222;
  outline: none;
  font-family: 'Times New Roman', Times, serif;
  border-radius: 12px;
}

.clear-btn {
  position: absolute;
  right: 15px;
  top: 57%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #888888;
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.2s ease;
}
</style>