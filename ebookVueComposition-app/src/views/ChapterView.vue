<template>
  <div class="chapter-collection">
    <h1 class="title">Chapters</h1>
    <RouterLink to="/addChapter" class="add-chapter-link">Add New Chapter</RouterLink>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="container">
      <div v-if="chapters && chapters.length">
        <ChapterCard :chapters="chapters" :limitContentWords="limitContentWords" />
      </div>
      <div v-else class="loading-message">Loading.............................</div>
    </div>
  </div>
</template>

<script>
import ChapterCard from '../components/ChapterCard.vue';
import getChapters from '../composables/getChapters';
import { RouterLink } from 'vue-router';

export default {
  name: 'ChapterView',
  components: { ChapterCard, RouterLink },
  setup() {
    const { chapters, error, load } = getChapters();

    load();

    const limitContentWords = (content, maxWords) => {
      const words = content.split(' ').slice(0, maxWords);
      return words.join(' ');
    };

    return { chapters, error, limitContentWords };
  },
};
</script>

<style scoped>
.chapter-collection {
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

.add-chapter-link {
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

.add-chapter-link:hover {
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
