<template>
  <div>
    <BPopover
      manual
      :close-on-hide="true"
      :delay="{ show: 0, hide: 0 }"
      :placement="'bottom'"
    >
      <template #target="{ toggle }">
        <BButton @click="toggle" variant="success">Login</BButton>
      </template>
      <LoginForm />
    </BPopover>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '../auth/LoginForm.vue';
</script>
