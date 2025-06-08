<template>
  <div>
    <BForm @submit="onSubmit">
      <InputField
        placeholder="Enter your email"
        label="Email"
        name="email"
        :rules="emailSchema"
        type="email"
        :model-value="values.email"
      />
      <InputField
        placeholder="Enter your password"
        label="Password"
        type="password"
        :rules="passwordSchema"
        name="password"
        :model-value="values.password"
      />
      <div>
        Forgot your password? <a href="#">Click here</a> to reset it.
        <BButton
          :disabled="!isSubmitting && !meta.valid"
          type="submit"
          variant="primary"
        >
          Login
        </BButton>
      </div>
    </BForm>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import InputField from '../form/InputField.vue';
import { emailSchema, passwordSchema } from '../../Schemas';
import { useAuth } from '../../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { login } = useAuth();

const { values, handleSubmit, resetForm, isSubmitting, meta } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
});

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful
      // successMessage.value = 'Login successful!';
      console.log('Login successful:', data);

      // Store the JWT token and user data
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      login(data.token, data.user);
      // Reset form
      resetForm();
      router.push('/');

      // Redirect to dashboard (optional)
      // router.push('/dashboard');
    } else {
      // Login failed
      console.error('Login failed:', data.message);
    }
  } catch (error) {
    console.error('Network error:', error);
    // errorMessage.value = 'Network error. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
});
</script>
