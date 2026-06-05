<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      
      <button type="button" class="close-btn" @click="$emit('close')">
        <Icon icon="mdi:close" width="24" height="24" />
      </button>

      <div class="modal-header">
        <h2>{{ isLoginMode ? 'Logowanie do Manticore' : 'Załóż konto w Manticore' }}</h2>
        <p>{{ isLoginMode ? 'Zaloguj się, aby odblokować oferty klubowe.' : 'Dołącz do klubu i kupuj menu Sfinksa 50% taniej!' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        
        <div v-if="!isLoginMode" class="form-group">
          <label for="username">Nazwa użytkownika</label>
          <div class="input-wrapper">
            <Icon icon="mdi:account" class="input-icon" />
            <input type="text" id="username" v-model="formData.username" placeholder="np. piotr123" required />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Adres E-mail</label>
          <div class="input-wrapper">
            <Icon icon="mdi:email" class="input-icon" />
            <input type="email" id="email" v-model="formData.email" placeholder="twoj@email.com" required />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Hasło</label>
          <div class="input-wrapper">
            <Icon icon="mdi:lock" class="input-icon" />
            <input type="password" id="password" v-model="formData.password" placeholder="••••••••" required />
          </div>
        </div>

        <button type="submit" class="submit-btn">
          {{ isLoginMode ? 'Zaloguj się' : 'Zarejestruj się' }}
        </button>
      </form>

      <div class="modal-footer">
        <p v-if="isLoginMode">
          Nie masz jeszcze konta? 
          <a href="#" @click.prevent="isLoginMode = false">Zarejestruj się</a>
        </p>
        <p v-else>
          Masz już konto? 
          <a href="#" @click.prevent="isLoginMode = true">Zaloguj się</a>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Icon } from '@iconify/vue';


const emit = defineEmits<{
  (e: 'close'): void
  (e: 'auth-success', userData: { email: string }): void
}>();

const isLoginMode = ref(true);

const formData = reactive({
  username: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  const BACKEND_URL = 'https://localhost:7294/api/auth';

  try {
    if (isLoginMode.value) {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Błędne dane logowania!');
      }


      emit('auth-success', { email: data.email });
      
    } else {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'Nie udało się zarejestrować!');
      }

      alert("Konto założone pomyślnie w bazie Manticore! Teraz możesz się zalogować.");
      formData.password = '';
      isLoginMode.value = true;
    }
  } catch (error: any) {
    alert(`Błąd: ${error.message}`);
  }
};

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #e30613;
}

.modal-header {
  text-align: center;
  margin-bottom: 30px;
}

.modal-header h2 {
  color: #222;
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.modal-header p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #aaa;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
}

.input-wrapper input:focus {
  border-color: #e30613;
  outline: none;
}

.submit-btn {
  background: #e30613;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #b00010;
}

.modal-footer {
  text-align: center;
  margin-top: 25px;
  font-size: 0.9rem;
  color: #666;
}

.modal-footer a {
  color: #e30613;
  font-weight: 600;
  text-decoration: none;
}

.modal-footer a:hover {
  text-decoration: underline;
}
</style>
</style>

