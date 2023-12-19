<template>
  <div class="add-book-container">
    <div v-if="showSuccess" class="success-message">
      Book successfully added!
    </div>
    <div v-else class="add-book-box">
      <h1>Create a New Book</h1>
      <hr>
      <form @submit.prevent="addBook" class="add-book-form">
        <div class="form-group">
          <label for="title">Title:</label>
          <input v-model="title" id="title" name="title" type="text" required class="form-input"
            placeholder="Input Book Title">
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="description" id="description" name="description" rows="4" required class="form-input"
            placeholder="Input Book Description eg: This is the story of a young man who died and revive"></textarea>
        </div>

        <div class="form-group">
          <label for="coverImage">Cover Image Link:</label>
          <input v-model="coverImage" id="coverImage" name="coverImage" type="text" required class="form-input"
            placeholder="Input image link eg:https://novelbin.me/media/novel/my-wife-is-a-beautiful-ceo.jpg">
        </div>

        <div class="form-group">
          <label for="authorId">Author:</label>
          <select v-model="authorId" id="authorId" name="authorId" required class="form-input">
            <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}</option>
          </select>
        </div>

        <button type="submit" class="btn">Create Book</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const title = ref('');
    const description = ref('');
    const coverImage = ref('');
    const authorId = ref('');
    const authors = ref([]);
    const showSuccess = ref(false);

    const addBook = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title.value,
            description: description.value,
            cover_image: coverImage.value,
            author_id: authorId.value,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add book');
        }

        showSuccess.value = true;

        setTimeout(() => {
          router.push('/books');
        }, 1000);
      } catch (error) {
        console.error('Error adding book:', error.message);
      }
    };

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

    onMounted(() => {
      fetchAuthors();
    });

    return { title, description, coverImage, authorId, authors, addBook, showSuccess };
  },
};
</script>

<style scoped>
.add-book-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.add-book-box {
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

.add-book-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: center;
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
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

.btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

hr {
  margin-bottom: 20px;
  margin-top: 20px;
}</style>
