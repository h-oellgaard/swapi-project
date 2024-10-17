<template>
  <div class="container mt-5">

    <div class="columns is-multiline">
      <!-- Loop through characters fetched from the API -->
      <div class="column is-one-third" v-for="person in people.results" :key="person.name">
        <div class="box">
          <h2 class="subtitle">{{ person.name }}</h2>

          <!-- Comment form for each character -->
          <form @submit.prevent="submitComment(person.name)" class="field">
            <label class="label">Add a comment for {{ person.name }}:</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="newComment[person.name]"
                placeholder="Your comment"
              />
            </div>
            <div class="control mt-2">
              <button class="button is-link">Submit Comment</button>
            </div>
          </form>

          <!-- Display comments for each character -->
          <div v-if="comments[person.name] && comments[person.name].length" class="mt-3">
            <h4 class="subtitle is-6">Comments:</h4>
            <ul>
              <li
                v-for="comment in comments[person.name]"
                :key="comment"
                class="notification is-light"
              >
                {{ comment }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import swapiService from '@/services/swapiService'; // Import API service

// Reactive state variables
const people = ref([]);
const newComment = ref({});
const comments = ref({});

// Fetch characters and load comments from the Express server when the component mounts
const fetchPeople = async () => {
  try {
    const data = await swapiService.fetchPeople();
    people.value = data;

    // Fetch comments for each character from the Express server
    data.results.forEach(async (person) => {
      const characterComments = await swapiService.getComments(person.name);
      comments.value[person.name] = characterComments;
    });
  } catch (error) {
    console.error('Error fetching Star Wars characters:', error);
  }
};

// Submit a comment for a character
const submitComment = async (personName) => {
  try {
    // Submit the comment to the Express server
    await swapiService.postComment(personName, newComment.value[personName]);

    // Fetch updated comments after submission
    const updatedComments = await swapiService.getComments(personName);
    comments.value[personName] = updatedComments;

    // Clear the input field
    newComment.value[personName] = '';
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};

// Fetch people when the component is mounted
onMounted(fetchPeople);
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.box {
  background-color: #f5f5f5;
}

.subtitle {
  font-size: 1.5em;
}

.notification {
  background-color: #f0f0f0;
}
</style>
