<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const roadmapData = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchRoadmap = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://192.168.166.138:8000/api/roadmaps/${route.params.id}/`, { method: 'GET', headers: { 'Authorization': `Token ${token}` } });
    if (!response.ok) {
      throw new Error('Failed to fetch roadmap data');
    }
    roadmapData.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRoadmap);
</script>

<template>
  <div class="container">
    <h1 class="title">{{ roadmapData?.name }}</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <div v-for="(step, index) in roadmapData.roadmap.steps" :key="index" class="step-card">
        <h2 class="step-title">{{ step.title }}</h2>
        <p class="step-days">Günler: {{ step.days }}</p>
        <ul class="theme-list">
          <li v-for="(theme, tIndex) in step.themes" :key="tIndex" class="theme-item">{{ theme.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  padding: 80px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.loading {
  color: gray;
}

.error {
  color: red;
}

.step-card {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.step-title {
  font-size: 20px;
  font-weight: bold;
}

.step-days {
  color: gray;
}

.theme-list {
  margin-top: 10px;
  padding-left: 20px;
}

.theme-item {
  list-style-type: disc;
}

.roadmap-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dashboard-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.dashboard-card:hover {
  background-color: #f9f9f9;
}

.roadmap-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
