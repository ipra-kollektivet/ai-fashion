<template>
  <div>
    <BForm @submit="onSubmit">
      <InputField
        placeholder="Enter your name"
        label="Name"
        name="name"
        :rules="usernameSchema"
        type="text"
        :model-value="values.name"
      />
      <InputField
        placeholder="Enter your email"
        label="Email"
        name="email"
        :rules="emailSchema"
        type="email"
        :model-value="values.email"
      />
      <InputField
        placeholder="Enter a password"
        label="Password"
        type="password"
        :rules="passwordSchema"
        name="password"
        :model-value="values.password"
      />
      <InputField
        placeholder="Confirm Password"
        label="Confirm password"
        type="password"
        :rules="passwordSchema"
        name="confirmPassword"
        :model-value="values.confirmPassword"
      />

      <BButton
        :disabled="!isSubmitting && !meta.valid"
        type="submit"
        variant="primary"
        >Register</BButton
      >
      <div v-if="errorMessage" class="text-danger mt-2">
        {{ errorMessage }}
      </div>
    </BForm>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import InputField from '../form/InputField.vue';
import { emailSchema, passwordSchema, usernameSchema } from '../../Schemas';

const { values, handleSubmit, resetForm, meta, isSubmitting, setFieldError } =
  useForm({
    initialValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
  });
const errorMessage = ref('');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        name: values.name,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // // Registration successful
      // successMessage.value = data.message;
      // console.log('Registration successful:', data);

      // Store the JWT token (optional - for auto-login after registration)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Reset form after successful registration
      resetForm();

      // Redirect to dashboard or login page (optional)
      // router.push('/dashboard');
    } else {
      if (data.message.includes('already exists')) {
        setFieldError('email', 'Email already exists');
      } else {
        errorMessage.value = data.message || 'Registration failed';
      }
    }
  } catch (error) {
    console.error('Network error:', error);
    errorMessage.value = 'Network error. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
});
</script>
