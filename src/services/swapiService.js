export default {
  async fetchPeople() {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
