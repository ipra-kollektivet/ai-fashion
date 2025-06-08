<template>
  <p>
    <label style="font-weight: bold"
      >{{ label }}

      <span v-if="required" style="color: red">*</span>
    </label>
    <BFormSelect
      :placeholder="placeholder"
      :disabled="disabled"
      form="form"
      size="lg"
      :state="meta.valid ? null : false"
      :options="options"
      v-model="value"
    />

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
  required?: boolean;
  options: Array<{ value: string | null; text: string }>;
  disabled?: boolean;
}>();

const schema = props.rules ? toTypedSchema(props.rules) : undefined;

const { value, meta, errorMessage } = useField<string>(props.name, schema, {});
</script>
<style></style>
