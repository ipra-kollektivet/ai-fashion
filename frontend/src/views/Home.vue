<template>
  <div class="home">
    <h1>Welcome to AI Stylist</h1>
    <AddGarmentForm @garment-added="handleGarmentAdded" />

    <!-- Garments Display Section -->
    <div class="garments-section mt-5">
      <h2>Your Wardrobe</h2>

      <!-- Loading state -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Empty state -->
      <div v-else-if="garments.length === 0" class="text-center text-muted">
        <p>No garments found. Add your first garment to get started!</p>
      </div>

      <!-- Garments grid -->
      <div v-else class="row">
        <div
          v-for="garment in garments"
          :key="garment.id"
          class="col-md-4 mb-3"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ garment.type }}</h5>
              <p class="card-text">
                <strong>Color:</strong> {{ garment.color }}<br />
                <strong>Material:</strong> {{ garment.material }}<br />
                <strong>Style:</strong> {{ garment.style }}<br />
                <span v-if="garment.seasons && garment.seasons.length">
                  <strong>Seasons:</strong> {{ garment.seasons.join(', ')
                  }}<br />
                </span>
                <span v-if="garment.description">
                  <strong>Description:</strong> {{ garment.description }}
                </span>
              </p>
              <small class="text-muted">
                Added {{ new Date(garment.created_at).toLocaleDateString() }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AddGarmentForm from '../components/clothing/AddGarmentForm.vue';
import { useAuth } from '../composables/useAuth';

interface Garment {
  id: number;
  type: string;
  color: string;
  material: string;
  style: string;
  seasons: string[];
  description: string;
  created_at: string;
  updated_at: string;
}

const { getAuthHeaders } = useAuth();
const garments = ref<Garment[]>([]);
const loading = ref(false);
const error = ref('');

const fetchGarments = async () => {
  try {
    loading.value = true;
    error.value = '';

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const authHeaders = getAuthHeaders();
    if (authHeaders.Authorization) {
      headers.Authorization = authHeaders.Authorization;
    }

    const response = await fetch('/api/garments', {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch garments');
    }

    const data = await response.json();
    garments.value = data;
  } catch (err: any) {
    error.value = err.message || 'Failed to load garments';
    console.error('Error fetching garments:', err);
  } finally {
    loading.value = false;
  }
};

const handleGarmentAdded = (garment: Garment) => {
  console.log('New garment added:', garment);
  // Add the new garment to the list without refetching
  garments.value.unshift(garment);
};

// Fetch garments when component mounts
onMounted(() => {
  fetchGarments();
});
</script>

<style scoped>
.home {
  padding: 2rem;
}

.garments-section {
  border-top: 1px solid #dee2e6;
  padding-top: 2rem;
}

.card {
  height: 100%;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #495057;
  text-transform: capitalize;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
}

h2 {
  color: #495057;
  margin-bottom: 1.5rem;
}
</style>
