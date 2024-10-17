<!-- src/App.vue -->
<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">Star Wars Characters</h1>
          <p class="subtitle">Click on a character to view comments</p>
      </div>
        </section>    
    <StarWarsPeople />
  </div>
</template>

<script>
import StarWarsPeople from './components/StarWarsPeople.vue';  // Import the StarWarsPeople component
import 'bulma/css/bulma.css';

export default {
  components: {
    StarWarsPeople,  // Register the component
  },
};
</script>
