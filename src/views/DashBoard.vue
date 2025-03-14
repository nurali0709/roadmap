<script setup>
import { ref } from 'vue'

// Static list of roadmaps
const roadmaps = ref([
  { id: 1, name: 'Frontend Developer', created_at: '2024-01-10' },
  { id: 2, name: 'Backend Developer', created_at: '2024-02-15' },
  { id: 3, name: 'Full-Stack Developer', created_at: '2024-03-01' },
  { id: 4, name: 'DevOps Engineer', created_at: '2024-03-10' },
  { id: 5, name: 'Data Scientist', created_at: '2024-04-05' },
])

const loading = ref(false)
const errorMessage = ref('')
const showModal = ref(false) // Control modal visibility

// Data for new roadmap form
const newRoadmapData = ref({
  name: '',
  category: '',
  subCategory: '',
  superSubCategory: '',
  timeToLearn: '',
  hoursInDay: '',
  daysInWeek: '',
})

// Open the modal
const createRoadmap = () => {
  showModal.value = true
}

// Submit the new roadmap
const submitRoadmap = () => {
  loading.value = true
  setTimeout(() => {
    const newRoadmap = {
      id: roadmaps.value.length + 1,
      name: newRoadmapData.value.name,
      created_at: new Date().toISOString().split('T')[0], // Today's date
    }
    roadmaps.value.push(newRoadmap)
    showModal.value = false // Close modal after submission
    loading.value = false
  }, 1000) // Simulate API delay
}

// Close the modal
const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <div class="dashboard-container">
    <h1>My Roadmaps</h1>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button @click="createRoadmap" :disabled="loading">
      {{ loading ? 'Generating...' : 'Generate New Roadmap' }}
    </button>

    <!-- Roadmap Grid -->
    <div class="dashboard-grid">
      <div v-for="roadmap in roadmaps" :key="roadmap.id" class="dashboard-card">
        <h3>{{ roadmap.name }}</h3>
        <p>Created: {{ new Date(roadmap.created_at).toLocaleDateString() }}</p>
      </div>
    </div>

    <!-- Modal for Creating a New Roadmap -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-container">
        <h2>Create New Roadmap</h2>
        <form @submit.prevent="submitRoadmap">
          <div class="form-group">
            <label for="name">Name:</label>
            <input v-model="newRoadmapData.name" id="name" type="text" required />
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <input v-model="newRoadmapData.category" id="category" type="text" required />
          </div>
          <div class="form-group">
            <label for="subCategory">SubCategory:</label>
            <input v-model="newRoadmapData.subCategory" id="subCategory" type="text" required />
          </div>
          <div class="form-group">
            <label for="superSubCategory">Super SubCategory:</label>
            <input
              v-model="newRoadmapData.superSubCategory"
              id="superSubCategory"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="timeToLearn">Time to Learn:</label>
            <input v-model="newRoadmapData.timeToLearn" id="timeToLearn" type="text" required />
          </div>
          <div class="form-group">
            <label for="hoursInDay">Hours per Day:</label>
            <input v-model="newRoadmapData.hoursInDay" id="hoursInDay" type="number" required />
          </div>
          <div class="form-group">
            <label for="daysInWeek">Days per Week:</label>
            <input v-model="newRoadmapData.daysInWeek" id="daysInWeek" type="number" required />
          </div>

          <div class="modal-actions">
            <button type="submit" :disabled="loading">
              {{ loading ? 'Saving...' : 'Create Roadmap' }}
            </button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
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

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.4s ease;
}

/* Modal Container */
.modal-container {
  background-color: #f8fafc;
  padding: 30px;
  border-radius: 16px;
  width: 550px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  transform: scale(0.8);
  animation: scaleUp 0.3s ease forwards;
}

/* Modal Header */
h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
  text-align: center;
}

/* Form Group */
.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

input {
  width: 90%;
  padding: 12px;
  font-size: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: #f9fafb;
  transition: border 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 5px rgba(79, 70, 229, 0.3);
}

/* Modal Actions */
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #4f46e5;
  color: white;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #4338ca;
}

button[type='button'] {
  background-color: #f44336;
}

button:disabled {
  background-color: #c4c4c4;
  cursor: not-allowed;
}

/* Smooth Modal Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 600px) {
  .modal-container {
    width: 90%;
    padding: 20px;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
