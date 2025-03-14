<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(false)
const errorMessage = ref('')
const showModal = ref(false)

const newRoadmapData = ref({
  name: '',
  category: '',
  subCategory: '',
  superSubCategory: '',
  timeToLearn: '',
  hoursInDay: '',
  daysInWeek: [],
})

const roadmaps = ref([])
const availableDays = ref([])
const categories = ref([]) // Store the main categories
const subCategories = ref([]) // Store subcategories
const superSubCategories = ref([]) // Store super subcategories

const fetchRoadmaps = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('token')

    const response = await fetch('http://192.168.166.138:8000/api/roadmaps/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch roadmaps')
    }

    const data = await response.json()
    roadmaps.value = data
  } catch (error) {
    errorMessage.value = 'Failed to fetch roadmaps'
  } finally {
    loading.value = false
  }
}


// Open the modal
const createRoadmap = () => {
  showModal.value = true
}

// Submit the new roadmap
const submitRoadmap = async () => {
  loading.value = true
  try {
    // Create the payload for the POST request
    const newRoadmap = {
      name: newRoadmapData.value.name,
      category: newRoadmapData.value.superSubCategory,
      total_days: newRoadmapData.value.timeToLearn, // Assuming this is the total time to learn
      daily_hours: newRoadmapData.value.hoursInDay, // Assuming this is the daily study hours
      available_days: newRoadmapData.value.daysInWeek // Selected days in the week
    }

    const token = localStorage.getItem('token')

    // Send the data to the backend using fetch
    const response = await fetch('http://192.168.166.138:8000/api/roadmaps/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(newRoadmap), // Convert the payload to a JSON string
    })

    if (!response.ok) {
      // Handle HTTP errors (status code outside of 2xx)
      throw new Error('Failed to submit the roadmap')
    }

    // If the request is successful, handle the response
    const data = await response.json()

    // If the request is successful (e.g., 201 Created), update the UI accordingly
    const createdRoadmap = {
      id: roadmaps.value.length + 1,
      name: newRoadmapData.value.name,
    }
    roadmaps.value.push(createdRoadmap)
    showModal.value = false // Close modal after submission
  } catch (error) {
    console.error("Error submitting roadmap:", error)
    errorMessage.value = "Something went wrong. Please try again." // Display an error message
  } finally {
    loading.value = false
  }
}
// Close the modal
const closeModal = () => {
  showModal.value = false
}

// Fetch the available days from the API
const fetchAvailableDays = async () => {
  try {
    const response = await fetch('http://192.168.166.138:8000/api/weekdays/') // Replace with your actual API endpoint
    const data = await response.json()
    availableDays.value = data // Assuming the response is an array of days
  } catch (error) {
    errorMessage.value = 'Failed to fetch days of the week'
  }
}

const fetchCategories = async () => {
  try {
    const response = await fetch('http://192.168.166.138:8000/api/categories/') // Replace with your actual API endpoint
    const data = await response.json()
    categories.value = data // Assuming the response is an array of categories
  } catch (error) {
    errorMessage.value = 'Failed to fetch categories'
  }
}

const fetchSubCategories = (categoryId) => {
  const selectedCategory = categories.value.find((cat) => cat.id === categoryId)
  subCategories.value = selectedCategory ? selectedCategory.children : []
  superSubCategories.value = [] // Reset super subcategories when changing category
}

// Fetch super subcategories based on selected subcategory
const fetchSuperSubCategories = (subCategoryId) => {
  const selectedSubCategory = subCategories.value.find((subCat) => subCat.id === subCategoryId)
  superSubCategories.value = selectedSubCategory ? selectedSubCategory.children : []
}

// Fetch days on component mount
onMounted(() => {
  fetchAvailableDays()
  fetchCategories()
  fetchRoadmaps()
})
</script>

<template>
  <div class="dashboard-container">
    <h1>Meniň Ýol Kartalarym</h1>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button @click="createRoadmap" :disabled="loading">
      {{ loading ? 'Generating...' : 'Täze Ýol Karta Generirle' }}
    </button>

    <!-- Roadmap Grid -->
    <div class="dashboard-grid">
      <div v-for="roadmap in roadmaps" :key="roadmap.id" class="dashboard-card">
        <h3>{{ roadmap.name }}</h3>
        <p>Created: {{ roadmap.date_created }}</p>
      </div>
    </div>

    <!-- Modal for Creating a New Roadmap -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-container">
        <h2>Täze ýol karta döret</h2>
        <form @submit.prevent="submitRoadmap">
          <div class="form-group">
            <label for="name">Ady:</label>
            <input v-model="newRoadmapData.name" id="name" type="text" required />
          </div>
          <div class="form-group">
            <label for="category">Kategoriýa:</label>
            <select
              v-model="newRoadmapData.category"
              id="category"
              @change="fetchSubCategories(newRoadmapData.category)"
              required
            >
              <option value="" disabled selected>Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="subCategory">SubKategoriýa:</label>
            <select
              v-model="newRoadmapData.subCategory"
              id="subCategory"
              @change="fetchSuperSubCategories(newRoadmapData.subCategory)"
              required
            >
              <option value="" disabled selected>Select SubCategory</option>
              <option
                v-for="subCategory in subCategories"
                :key="subCategory.id"
                :value="subCategory.id"
              >
                {{ subCategory.name }}
              </option>
            </select>
          </div>

          <!-- Super Subcategory Dropdown -->
          <div class="form-group">
            <label for="superSubCategory">Super SubKategoriýa:</label>
            <select v-model="newRoadmapData.superSubCategory" id="superSubCategory" required>
              <option value="" disabled selected>Select Super SubCategory</option>
              <option
                v-for="superSubCategory in superSubCategories"
                :key="superSubCategory.id"
                :value="superSubCategory.id"
              >
                {{ superSubCategory.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="timeToLearn">Öwrenmäne wagt:</label>
            <input v-model="newRoadmapData.timeToLearn" id="timeToLearn" type="number" required />
          </div>
          <div class="form-group">
            <label for="hoursInDay">Günde näçe wagt:</label>
            <input v-model="newRoadmapData.hoursInDay" id="hoursInDay" type="number" required />
          </div>

          <!-- Multiselect Dropdown for Days of the Week -->
          <div class="form-group">
            <label for="daysInWeek">Hepdäň günleri:</label>
            <select
              v-model="newRoadmapData.daysInWeek"
              id="daysInWeek"
              multiple
              size="7"
              class="custom-multiselect"
              required
            >
              <option v-for="day in availableDays" :key="day.id" :value="day.id">
                {{ day.name }}
              </option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="submit" :disabled="loading">
              {{ loading ? 'Saving...' : 'Ýol Karta Döret' }}
            </button>
            <button type="button" @click="closeModal">Ýatyr</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 1500px;
  margin: auto;
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

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
  animation: fadeIn 0.5s ease-out;
}

/* Modal Container */
.modal-container {
  background-color: #f8fafc;
  padding: 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  transform: scale(0.9);
  animation: scaleUp 0.5s ease forwards;
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
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

input,
select {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: #f9fafb;
  transition: border 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: linear-gradient(135deg, #1e293b, #0f172a);
  box-shadow: 0 0 5px rgba(79, 70, 229, 0.3);
}

input {
  margin-top: 5px;
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
    transform: scale(0.9);
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
