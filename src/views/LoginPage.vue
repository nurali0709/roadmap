<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    const response = await fetch("http://192.168.166.138:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    localStorage.setItem("token", data.token);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    console.log("User Data:", data);
    router.push("/dashboard"); 
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="form-container">
      <h2>Login</h2>
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button @click="login">Login</button>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<style scoped>
/* Background styling */
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e293b, #0f172a);
}

/* Form container */
.form-container {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 320px;
  width: 100%;
}

/* Heading */
h2 {
  margin-bottom: 20px;
  color: #333;
}

/* Inputs */
input {
  width: 90%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: 0.3s;
  font-size: 16px;
}

/* Input focus effect */
input:focus {
  border-color: linear-gradient(135deg, #27364c, #1a2637);
  box-shadow: 0 0 8px rgba(66, 185, 131, 0.5);
  outline: none;
}

/* Button */
button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #27364c, #1a2637);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
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
/* Link styling */
p {
  margin-top: 10px;
  font-size: 14px;
}

a {
  color: linear-gradient(135deg, #27364c, #1a2637);
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
