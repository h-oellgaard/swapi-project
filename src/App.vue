<!-- src/App.vue -->
<template>
  <div id="app">
    <StarWarsPeople />
  </div>
</template>

<script>
import StarWarsPeople from './components/StarWarsPeople.vue';  // Import the StarWarsPeople component

export default {
  components: {
    StarWarsPeople,  // Register the component
  },
};
</script>
