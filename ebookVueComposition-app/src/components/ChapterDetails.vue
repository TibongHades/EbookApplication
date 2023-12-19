<template>
  <div class="chapter-card">
    <div class="card-details">
      <div class="card-row">
        <span class="label">Book ID</span>
        <span>{{ chapter.book_id }}</span>
      </div>
      <div class="card-row">
        <span class="label">Chapter Title:</span>
        <span>{{ chapter.title }}</span>
      </div>
      <div class="card-row">
        <span class="label">Chapter Content:</span>
        <span>{{ limitContentWords(chapter.content, 10) }}.....</span>
      </div>
      <hr>
      <h3>Actions</h3>
      <div class="buttons">
        <RouterLink :to="{ name: 'editChapter', params: { id: chapter.id } }" class="edit-link">
          <button class="edit-button">Edit Chapter</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: ['chapter'],
  methods: {
    limitContentWords(content, maxWords) {
      const words = content.split(' ').slice(0, maxWords);
      return words.join(' ');
    },
  },
};
</script>

<style scoped>
.chapter-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #7f7f7f;
  border-radius: 8px;
  width: 750px;
  margin: 20px auto;
  margin-top: 5%;
  padding: 10px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.card-details {
  display: flex;
  flex-direction: column;
  background-color: #1a1a1aa3;
  color: #ffd700;
}

.link {
  text-decoration: none;
}

.card-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 5px 0;
}

.label {
  font-weight: bold;
  margin-right: 5px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 10px;
}

.edit-link {
  align-self: center;
}

.edit-button {
  padding: 10px;
  width: 150px;
  font-weight: bolder;
  background-color: #ffd700;
  color: #1a1a1a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.edit-button:hover {
  background-color: #1a8b06;
  transform: scale(1.05);
}
</style>
