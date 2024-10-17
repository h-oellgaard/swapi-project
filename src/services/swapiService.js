const baseUrl = 'http://localhost:3000/api';  // Base URL of the Express server

export default {
  // Fetch Star Wars characters from SWAPI via the Express server
  async fetchPeople() {
    try {
      const response = await fetch(`${baseUrl}/people`);
      if (!response.ok) {
        throw new Error('Failed to fetch people');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching people:', error);
      throw error;
    }
  },

  // Get comments for a specific character by name
  async getComments(characterName) {
    try {
      const response = await fetch(`${baseUrl}/characters/${characterName}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Post a new comment for a specific character by name
  async postComment(characterName, comment) {
    try {
      const response = await fetch(`${baseUrl}/characters/${characterName}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),  // Send the comment in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting comment:', error);
      throw error;
    }
  },
};
