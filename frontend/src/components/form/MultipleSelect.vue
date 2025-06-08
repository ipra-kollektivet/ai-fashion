<template>
  <p>
    <label style="font-weight: bold">{{ label }}</label>
    <BFormCheckboxGroup
      size="lg"
      value-field="value"
      text-field="text"
      :options="options"
      v-model="value"
    />

    <BFormInvalidFeedback>Select one</BFormInvalidFeedback>
  </p>
</template>

<script setup lang="ts">
import type { CheckboxValue } from 'bootstrap-vue-next';
import { useField } from 'vee-validate';

const props = defineProps<{
  placeholder?: string;
  name: string;
  label?: string;
  options: Array<{ value: string | null; text: string }>;
  disabled?: boolean;
}>();

const { value } = useField<CheckboxValue[]>(props.name, {});
</script>
<style></style>
