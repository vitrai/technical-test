<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref<string>('');
const apiResponse = ref<string>('');
const isLoading = ref<boolean>(false);

const handleInputChange = async (_e: Event): Promise<void> => {
  if (!inputValue.value.trim()) {
    apiResponse.value = '';
    return;
  }

  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:5170/do-work', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputValue.value }),
    });
    const data = (await response.json()) as { message: string };
    apiResponse.value = `Response: ${data.message}`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    apiResponse.value = `Error: ${errorMessage}`;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="app">
    <header>
      <h1>Technical Test App</h1>
    </header>

    <main>
      <div class="input-container">
        <label for="textbox">Enter text:</label>
        <input
          id="textbox"
          v-model="inputValue"
          type="text"
          placeholder="Type something..."
          class="text-input"
          @input="handleInputChange"
        />
      </div>

      <div v-if="isLoading" class="status">Loading...</div>
      <div v-else-if="apiResponse" class="response">
        {{ apiResponse }}
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: #42b883;
}

.input-container {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.text-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.text-input:focus {
  outline: none;
  border-color: #42b883;
}

.status,
.response {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.status {
  background-color: #f0f0f0;
  color: #666;
}

.response {
  background-color: #e8f5e9;
  color: #2e7d32;
}
</style>
