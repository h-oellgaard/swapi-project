<template>
  <div>
    <h1>Star Wars Characters (with comments)</h1>

    <ul>
      <!-- Loop through characters fetched from the API -->
      <li v-for="person in people.results" :key="person.name">
        {{ person.name }}

        <!-- Comment form for each character -->
        <div>
          <form @submit.prevent="submitComment(person.name)">
            <label for="comment">Add a comment for {{ person.name }}:</label>
            <input type="text" v-model="newComment[person.name]" placeholder="Your comment" />
            <button type="submit">Submit Comment</button>
          </form>

          <!-- Display comments for each character -->
          <div v-if="comments[person.name] && comments[person.name].length">
            <h4>Comments:</h4>
            <ul>
              <li v-for="comment in comments[person.name]" :key="comment">{{ comment }}</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import swapiService from '@/services/swapiService';  // Import API service

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
