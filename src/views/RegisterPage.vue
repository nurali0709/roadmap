<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");
const first_name = ref("")
const last_name = ref("")
const date_of_birth = ref("")
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();

const register = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    const response = await fetch("http://192.168.166.138:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        first_name: first_name.value,
        last_name: last_name.value,
        date_of_birth: date_of_birth.value,
      }),
    });

    const data = await response.json();
    localStorage.setItem("token", data.token);

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    console.log("User Registered:", data);
    router.push("/dashboard"); 
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="form-wrapper">
    <div class="form-container">
      <h2>Register</h2>
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="first_name" type="text" placeholder="Ady" required />
      <input v-model="last_name" type="text" placeholder="Familiýasy" required />
      <input v-model="date_of_birth" type="text" placeholder="Doglan Senesi" required />
      <input v-model="password" type="password" placeholder="Password" required @keydown.enter="register" />
      <button @click="register">Register</button>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e293b, #0f172a);
}

.form-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  width: 350px;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

input {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s;
}

input:focus {
  outline: none;
  border-color: linear-gradient(135deg, #27364c, #1a2637);
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
}

button {
  margin-top: 15px;
  padding: 12px;
  background: linear-gradient(135deg, #27364c, #1a2637);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: linear-gradient(135deg, #324766, #22334b);
  box-shadow: 0px 6px 12px rgba(50, 71, 102, 0.4);
  transform: translateY(-2px);
}

/* Disabled Button */
button:disabled {
  background: linear-gradient(135deg, #3d4e67, #2a3b52);
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

p {
  margin-top: 10px;
  font-size: 14px;
}

router-link {
  color: linear-gradient(135deg, #27364c, #1a2637);
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
