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
      <BTabs content-class="mt-3">
        <BTab title="Login" active>
          <LoginForm />
        </BTab>
        <BTab title="Register"><RegisterForm /> </BTab>
      </BTabs>
    </BPopover>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '../auth/LoginForm.vue';
import RegisterForm from '../auth/RegisterForm.vue';
</script>
