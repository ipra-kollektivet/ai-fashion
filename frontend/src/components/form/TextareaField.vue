<template>
  <p>
    <label style="font-weight: bold">{{ label }}</label>
    <BFormTextarea
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="6"
      :state="meta.valid ? null : false"
      v-model="value"
    />
    {{ value.length }}/250
    <BFormInvalidFeedback>
      {{ errorMessage }}
    </BFormInvalidFeedback>
  </p>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { ZodSchema } from 'zod';

const props = defineProps<{
  placeholder?: string;
  name: string;
  label?: string;
  rules?: ZodSchema;
  disabled?: boolean;
}>();

const schema = props.rules ? toTypedSchema(props.rules) : undefined;

const { value, errorMessage, meta } = useField<string>(props.name, schema, {});
</script>
