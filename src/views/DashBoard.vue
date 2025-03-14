<script setup>
import { ref } from "vue";

// Static list of roadmaps
const roadmaps = ref([
  { id: 1, name: "Frontend Developer", created_at: "2024-01-10" },
  { id: 2, name: "Backend Developer", created_at: "2024-02-15" },
  { id: 3, name: "Full-Stack Developer", created_at: "2024-03-01" },
  { id: 4, name: "DevOps Engineer", created_at: "2024-03-10" },
  { id: 5, name: "Data Scientist", created_at: "2024-04-05" },
]);

const loading = ref(false);
const errorMessage = ref("");

// Generate a new roadmap (Frontend only for now)
const createRoadmap = () => {
  loading.value = true;
  setTimeout(() => {
    const newRoadmap = {
      id: roadmaps.value.length + 1,
      name: `New Roadmap ${roadmaps.value.length + 1}`,
      created_at: new Date().toISOString().split("T")[0], // Today's date
    };
    roadmaps.value.push(newRoadmap);
    loading.value = false;
  }, 1000); // Simulate API delay
};
</script>

<template>
  <div class="dashboard-container">
    <h1>My Roadmaps</h1>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button @click="createRoadmap" :disabled="loading">
      {{ loading ? "Generating..." : "Generate New Roadmap" }}
    </button>

    <!-- Roadmap Grid -->
    <div class="dashboard-grid">
      <div v-for="roadmap in roadmaps" :key="roadmap.id" class="dashboard-card">
        <h3>{{ roadmap.name }}</h3>
        <p>Created: {{ new Date(roadmap.created_at).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General Layout */
.dashboard-container {
  max-width: 1500px;
  margin: auto;
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Title */
h1 {
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 25px;
}

/* Generate Button */
button {
  background: #4f46e5;
  color: white;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(79, 70, 229, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 30px;
}

button:hover {
  background: #4338ca;
  box-shadow: 0px 6px 12px rgba(67, 56, 202, 0.5);
}

button:disabled {
  background: #94a3b8;
  box-shadow: none;
  cursor: not-allowed;
}

/* Grid Layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  cursor: pointer;
}

/* Roadmap Card - Glassmorphism Effect */
.dashboard-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.dashboard-card:hover {
  transform: translateY(-8px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
}

/* Roadmap Title */
.dashboard-card h3 {
  font-size: 20px;
  color: #f8fafc;
  margin-bottom: 8px;
}

/* Created Date */
.dashboard-card p {
  color: #94a3b8;
  font-size: 14px;
}

/* Responsive Design */
@media (max-width: 600px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
