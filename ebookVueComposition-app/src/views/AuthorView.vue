<template>
  <div class="author-collection">
    <h1 class="title">Authors</h1>
    <RouterLink to="/addAuthor" class="add-author-link">Add Author</RouterLink>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="container">
      <div v-if="authors.length">
        <AuthorCard :authors="authors" />
      </div>
      <div v-else class="loading-message">Loading.............................</div>
    </div>
  </div>
</template>

<script>
import AuthorCard from '../components/AuthorCard.vue';
import getAuthors from '../composables/getAuthors';
import { RouterLink } from 'vue-router';

export default {
  name: 'AuthorView',
  components: { AuthorCard, RouterLink },
  setup() {
    const { authors, error, load } = getAuthors();

    load();

    return { authors, error };
  },
};
</script>

<style scoped>
.author-collection {
  padding: 20px;
  min-height: 100vh;
  color: #ffd700;
}

.title {
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  color: gold;
  text-align: center;
}

.add-author-link {
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 20px;
  text-align: center;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.add-author-link:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.error-message {
  margin-bottom: 20px;
  background-color: #d9534f;
  color: #fff;
  padding: 10px;
  border: 1px solid #d43f3a;
  border-radius: 4px;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.loading-message {
  text-align: center;
  font-size: 20px;
}
</style>
