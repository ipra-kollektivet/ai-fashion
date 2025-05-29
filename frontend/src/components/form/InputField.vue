<template>
  <p>
    <label>{{ label }}:</label>
    <BFormInput
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :state="meta.valid"
      v-model="value"
    />

    <BFormInvalidFeedback>
      {{ errorMessage }}
    </BFormInvalidFeedback>
  </p>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { type InputType } from 'bootstrap-vue-next';
import { toTypedSchema } from '@vee-validate/zod';
import type { ZodSchema } from 'zod';

const props = defineProps<{
  placeholder?: string;
  name: string;
  label?: string;
  rules?: ZodSchema;
  type?: InputType;
  disabled?: boolean;
}>();

const schema = props.rules ? toTypedSchema(props.rules) : undefined;

const { value, errorMessage, meta } = useField<string>(props.name, schema, {});
</script>
