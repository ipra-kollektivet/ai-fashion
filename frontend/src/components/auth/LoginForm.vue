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
        <BButton type="submit" variant="primary">Login</BButton>
      </div>
    </BForm>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import InputField from '../form/InputField.vue';
import { emailSchema, passwordSchema } from '../../Schemas';

const { values, handleSubmit, resetForm } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
});

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted with values:', values);
  resetForm();
});
</script>
