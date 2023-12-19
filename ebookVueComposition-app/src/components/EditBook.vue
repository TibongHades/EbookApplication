<template>
  <router-link to="/books" class="back-button">Back to Books</router-link>
  <div class="book-details-container">
    <div v-if="isLoaded && book" class="book-details">
      <div v-if="showSuccessMessage" class="success-message">
        {{ successMessage }}
      </div>
      <h1>Edit the Book: {{ book.title }}</h1>
      <hr>
      <form @submit.prevent="handleUpdate" class="form-container">
        <div class="form-group">
          <label for="title">Title:</label>
          <input v-model="book.title" id="title" name="title" type="text" required class="form-input">
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="book.description" id="description" name="description" rows="4" required
            class="form-input"></textarea>
        </div>

        <div class="form-group">
          <label for="authorId">Author:</label>
          <select v-if="authors.length" v-model="book.author_id" required class="form-input">
            <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}</option>
          </select>
          <p v-else>Loading authors...</p>
        </div>

        <div class="button-group">
          <button type="submit" class="update-button">Update Book</button>
          <button @click="confirmDelete($event)" class="delete-button">Delete Book</button>
        </div>
      </form>
    </div>
    <div v-else class="loading">
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import getSingleBook from '../composables/getSingleBook';
import { useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const { book, error, load, update, deleteBook } = getSingleBook(props.id);
    const isLoaded = ref(false);
    const showSuccessMessage = ref(false);
    const successMessage = ref('');
    const authors = ref([]);
    const router = useRouter();

    onMounted(async () => {
      await load();
      isLoaded.value = true;

      await fetchAuthors();
    });

    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/author');
        if (!response.ok) {
          throw Error('No Data Available');
        }
        const data = await response.json();
        authors.value = data;
      } catch (err) {
        console.log(err.message);
      }
    };

    const handleUpdate = async () => {
      try {
        await update(book.value);
        showSuccessMessage.value = true;
        successMessage.value = 'Book successfully updated!';

        setTimeout(() => {
          showSuccessMessage.value = false;
          router.push('/books');
        }, 2000);
      } catch (err) {
        console.error(err.message);
      }
    };

    const confirmDelete = (event) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this Book?');
      if (!isConfirmed) {
        console.log('Deletion canceled');
        event.preventDefault();
      } else {
        handleDelete();
      }
    };


    const handleDelete = async () => {
      try {
        console.log('Deleting book...');
        await deleteBook();
        console.log('Book deleted successfully!');
        router.push('/books');
      } catch (err) {
        console.error('Error deleting book:', err.message);
      }
    };

    return { book, error, isLoaded, handleUpdate, confirmDelete, showSuccessMessage, successMessage, authors };
  },
};
</script>


<style scoped>
.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}

.book-details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.book-details {
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #0000006b;
  width: 80%;
}

.success-message {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
}

.form-input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  color: #333;
}

.form-input::placeholder {
  color: #aaa;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.form-input textarea {
  width: 100%;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.update-button,
.delete-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.update-button {
  background-color: #007bff;
  color: #fff;
}

.delete-button {
  background-color: #d9534f;
  color: #fff;
}</style>
