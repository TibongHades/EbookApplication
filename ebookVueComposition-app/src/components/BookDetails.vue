<template>
  <div class="book-card">
    <div class="card-details">
      <div class="card-row">
        <span class="label">Title:</span>
        <span>{{ book.title }}</span>
      </div>
      <div class="card-row">
        <span class="label">Description:</span>
        <span>{{ book.description }}</span>
      </div>
      <div class="card-row">
        <span class="label">Author ID:</span>
        <span>{{ book.author_id }}</span>
      </div>
      <hr>
      <h3>Actions</h3>
      <div class="buttons">
        <RouterLink :to="{ name: 'SingleBook', params: { id: book.id } }" class="view-link">
          <button class="view-button">View Book</button>
        </RouterLink>
        <RouterLink :to="{ name: 'editBook', params: { id: book.id } }" class="edit-link">
          <button class="edit-button">Edit Book</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: ['book'],
};
</script>

<style scoped>
.book-card {
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
  background-color: #1a1a1a80;
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

.buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 10px;
}

.view-button,
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

.view-button:hover,
.edit-button:hover {
  background-color: #1a8b06;
  transform: scale(1.05);
}
</style>
