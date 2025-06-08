<template>
  <nav class="navbar">
    <div class="navbar-brand">AI Stylist</div>
    <div class="navbar-nav">
      <LoginPopover v-if="!isLoggedIn" />
      <div v-else class="nav-item">
        <span>Welcome, {{ user.name || 'User' }} </span>
        <BButton variant="outline-danger" @click="handleLogout">Logout</BButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '../../composables/useAuth';
import { useRouter } from 'vue-router';
import LoginPopover from './LoginPopover.vue';

const { isLoggedIn, user, logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  try {
    logout();
    await router.push('/guest');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #343a40;
  color: white;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-item span {
  margin-right: 1rem;
}
</style>
