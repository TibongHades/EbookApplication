<template>
  <div class="book-details-container">
    <div v-if="book" class="book-details">
      <center>
        <div class="info-container">
          <div class="image">
            <img :src="book.cover_image" :alt="book.title" class="thumbnail">
          </div>
          <div class="info">
            <p class="book-id">Book ID: {{ book.id }}</p>
            <h1>Book Title:{{ book.title }}</h1>
            <p class="book-description">Book Description:{{ book.description }}</p>
            <p class="book-content">{{ book.content }}</p>
          </div>
        </div>
      </center>
      <div class="chapters">
        <div v-if="book.chapters">
          <center>
            <h2>Chapters:</h2>
          </center>
          <ul class="chapter-list">
            <li v-for="chapter in book.chapters" :key="chapter.id" class="chapter-item">
              <h3>{{ chapter.title }}</h3>
              <p>{{ chapter.content }}</p>
              <br><br>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import getSingleBook from '../composables/getSingleBook';

export default {
  props: ['id'],
  setup(props) {
    const { book, error, load } = getSingleBook(props.id);

    onMounted(() => {
      load();
    });

    return { book, error };
  },
};
</script>
<style scoped>
.book-details-container {
  color: #ffffff;
}

.info-container {
  background-color: rgba(0, 0, 0, 0.904);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
}

.image {
  padding: 20px 20px;
}

.info {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

li {
  list-style: none;
}

.chapters {
  background-color: white;
  color: black;
}

h2 {
  font-weight: bolder;
  padding: 20px 20px;
  font-size: 50px;
}</style>
