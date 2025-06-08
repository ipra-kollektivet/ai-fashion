<template>
  <nav class="navbar">
    <div class="navbar-brand">AI Stylist</div>
    <div class="navbar-nav">
      <LoginPopover v-if="!isLoggedIn" />
      <div v-else class="nav-item">
        <span>Welcome, {{ user.name }} </span>
        <BButton variant="outline-danger" @click="logout">Logout</BButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '../../composables/useAuth';
import LoginPopover from './LoginPopover.vue';

const { isLoggedIn, user, logout } = useAuth();
</script>
