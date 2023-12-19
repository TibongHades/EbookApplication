<template>
  <router-link to="/authors" class="back-button">Back to Authors</router-link>
  <div class="author-details-container">
    <div v-if="isLoaded && author" class="author-details">

      <div v-if="showSuccessMessage" class="success-message">
        {{ successMessage }}
      </div>

      <h1>Edit Author: {{ author.name }}</h1>
      <hr>
      <form @submit.prevent="handleUpdate" class="form-container">
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="author.name" id="name" name="name" type="text" required class="form-input">
        </div>

        <div class="form-group">
          <label for="bio">Bio:</label>
          <textarea v-model="author.bio" id="bio" name="bio" rows="6" required class="form-input"></textarea>
        </div>

        <div class="button-group">
          <button type="submit" class="update-button">Update Author</button>
          <button @click="confirmDelete($event)" class="delete-button">Delete Author</button>
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
import getSingleAuthor from '../composables/getSingleAuthor';
import { RouterLink, useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const { author, error, load, update, deleteBook } = getSingleAuthor(props.id);
    const isLoaded = ref(false);
    const showSuccessMessage = ref(false);
    const successMessage = ref('');
    const router = useRouter();
    onMounted(async () => {
      try {
        console.log('Before load function');
        await load();
        console.log('After load function');
        isLoaded.value = true;
      }
      catch (error) {
        console.error('Error in mounted hook:', error);
      }
    });
    const handleUpdate = async () => {
      try {
        await update(author.value);
        showSuccessMessage.value = true;
        successMessage.value = 'Author successfully updated!';
        setTimeout(() => {
          showSuccessMessage.value = false;
          router.push('/authors');
        }, 2000);
      }
      catch (err) {
        console.error(err.message);
      }
    };
    const confirmDelete = (event) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this Author?');
      if (!isConfirmed) {
        console.log('Deletion canceled');
        event.preventDefault();
      } else {
        handleDelete();
      }
    };

    const handleDelete = async () => {
      try {
        await deleteBook();
        router.push('/authors');
      }
      catch (err) {
        console.error(err.message);
      }
    };
    return {
      author,
      error,
      isLoaded,
      handleUpdate,
      confirmDelete,
      showSuccessMessage,
      successMessage,
    };
  },
  components: { RouterLink }
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

.author-details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.author-details {
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
}
</style>