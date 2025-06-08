<template>
  <div>
    <BButton @click="modal = !modal">Add garment</BButton>
    <BModal
      header-class="hej"
      button-size="lg"
      size="lg"
      header-close-class="bye"
      no-footer
      title="Add a new garment"
      v-model="modal"
    >
      <div class="header-text text-center wrap">
        We only need type and color, but the more information you share, the
        better we can help with your styling!
      </div>

      <BForm @submit="onSubmit">
        <SelectFormField
          name="garmentType"
          label="TYPE"
          required
          :rules="schema.garmentType"
          :options="[
            { value: '', text: 'Choose type' },
            { value: 'coat', text: 'Coat' },
            { value: 'jacket', text: 'Jacket' },
            { value: 'suit', text: 'Suit' },
            { value: 'sweater', text: 'Sweater' },
            { value: 'shirt', text: 'Shirt' },
            { value: 'tshirt', text: 'T-shirt' },
            { value: 'pants', text: 'Pants' },
            { value: 'shorts', text: 'Shorts' },
            { value: 'shoes', text: 'Shoes' },
          ]"
          :model-value="values.garmentType"
        />
        <SelectFormField
          name="garmentColor"
          label="COLOR"
          required
          :rules="schema.garmentColor"
          :options="[
            { value: '', text: 'Choose color' },
            { value: 'black', text: 'Black' },
            { value: 'white', text: 'White' },
            { value: 'beige', text: 'Beige' },
            { value: 'grey', text: 'Grey' },
            { value: 'navy blue', text: 'Navy blue' },
            { value: 'charcoal', text: 'Charcoal' },
            { value: 'white with print', text: 'White with print' },
            { value: 'black with print', text: 'Black with print' },
            { value: 'striped', text: 'Striped' },
          ]"
          :model-value="values.garmentColor"
        />
        <SelectFormField
          name="garmentMaterial"
          label="MATERIAL"
          :options="[
            { value: 'unknown', text: 'Select material' },
            { value: 'cotton', text: 'Cotton' },
            { value: 'wool', text: 'Wool' },
            { value: 'polyester', text: 'Polyester' },
            { value: 'leather', text: 'Leather' },
            { value: 'denim', text: 'Denim' },
            { value: 'linen', text: 'Linen' },
            { value: 'silk', text: 'Silk' },
            { value: 'nylon', text: 'Nylon' },
            { value: 'spandex', text: 'Spandex' },
            { value: 'acrylic', text: 'Acrylic' },
          ]"
          :model-value="values.garmentMaterial"
        />
        <MultipleSelect
          name="garmentSeasons"
          label="SEASONS"
          :options="[
            { value: 'spring', text: 'Spring' },
            { value: 'summer', text: 'Summer' },
            { value: 'autumn', text: 'Autumn' },
            { value: 'winter', text: 'Winter' },
          ]"
          :model-value="values.garmentSeasons"
        />
        <SelectFormField
          name="garmentStyle"
          label="STYLE"
          :options="[
            { value: 'unknown', text: 'Select style' },
            { value: 'relaxed', text: 'Relaxed' },
            { value: 'casual', text: 'Casual' },
            { value: 'smart casual', text: 'Smart Casual' },
            { value: 'formal', text: 'Formal' },
            { value: 'sporty', text: 'Sporty' },
          ]"
          :model-value="values.garmentStyle"
        />
        <TextareaField
          name="garmentDescription"
          label="DESCRIPTION"
          :rules="schema.garmentDescription"
          :model-value="values.garmentDescription"
          placeholder="Enter a description"
        />
        <BButton @click="closeModal()" variant="secondary" class="mt-3 me-2">
          Cancel
        </BButton>
        <BButton
          :disabled="!isSubmitting && !meta.valid"
          type="submit"
          variant="primary"
          class="mt-3"
        >
          Add garment
        </BButton>
      </BForm>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import SelectFormField from '../form/SelectFormField.vue';
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import { z } from 'zod';
import MultipleSelect from '../form/MultipleSelect.vue';
import TextareaField from '../form/TextareaField.vue';
import { useAuth } from '../../composables/useAuth';

const emit = defineEmits<{
  garmentAdded: [garment: any];
}>();

const { getAuthHeaders } = useAuth();

const modal = ref(false);

const schema = {
  garmentDescription: z
    .string()
    .max(250, 'Description cannot exceed 250 characters')
    .regex(
      /^[a-zA-Z0-9\s.,!?'-]*$/,
      'Only letters, numbers, spaces, and basic punctuation allowed'
    ),
  garmentColor: z.string().min(1, 'Please select a garment color'),
  garmentType: z.string().min(1, 'Please select a garment type'),
};

const { values, handleSubmit, resetForm, isSubmitting, meta } = useForm({
  initialValues: {
    garmentColor: '',
    garmentDescription: '',
    garmentMaterial: 'unknown',
    garmentSeasons: [],
    garmentStyle: 'unknown',
    garmentType: '',
  },
});

const closeModal = () => {
  modal.value = false;
  resetForm();
};

watch(modal, (newValue) => {
  if (newValue) {
    resetForm();
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const authHeaders = getAuthHeaders();
    if (authHeaders.Authorization) {
      headers.Authorization = authHeaders.Authorization;
    }

    const response = await fetch('/api/garments', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: values.garmentType,
        color: values.garmentColor,
        material: values.garmentMaterial,
        seasons: values.garmentSeasons,
        style: values.garmentStyle,
        description: values.garmentDescription,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to add garment');
    }

    // Success!
    emit('garmentAdded', data.garment);
    closeModal();
  } catch (err: any) {
    console.error('Error adding garment:', err);
  }
});
</script>

<style>
.hej {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 32px 32px 24px;
  position: relative;
  overflow: hidden;
}
.modal-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}
.bye {
  filter: invert(1) !important;
  transition: all 0.3s ease !important;
}
.bye:hover {
  transform: rotate(90deg) !important;
  filter: invert(1) !important;
}
.header-text {
  font-size: 1.8rem;
  padding: 32px 32px 24px;
  color: #333;
  /* margin-bottom: 16px; */
}
</style>
