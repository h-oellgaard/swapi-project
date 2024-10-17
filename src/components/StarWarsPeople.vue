<!-- src/components/StarWarsPeople.vue -->
<template>
    <div>
     <h1>Star Wars Characters</h1>
      <div v-if="!people.results">Loading...</div>
      <ul>
        <li v-for="person in people.results" :key="person.name">{{ person.name }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';  // Import Composition API functions
  import swapiService from '@/services/swapiService';  // Import the SWAPI service
  
  // Define a reactive reference to store the people data
  const people = ref([]);
  
  // Function to fetch the list of people from SWAPI
  const fetchPeople = async () => {
    try {
      const data = await swapiService.fetchPeople();
      people.value = data;  // Assign the fetched data to the reactive reference
    } catch (error) {
      console.error('Error fetching Star Wars characters:', error);
    }
  };
  
  // Fetch the data when the component is mounted
  onMounted(fetchPeople);
  </script>
    