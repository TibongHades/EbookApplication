<template>
  <div class="add-chapter-container">
    <div v-if="showSuccess" class="success-message">
      Chapter successfully added!
    </div>
    <div v-else class="add-chapter-box">
      <h1>Create a new Chapter of A Book</h1>
      <hr>
      <form @submit.prevent="addChapter" class="add-chapter-form">
        <div class="form-group">
          <label for="book_id">Book:</label>
          <select v-model="book_id" required class="form-input">
            <option v-for="book in books" :key="book.id" :value="book.id">{{ book.title }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="title">Title:</label>
          <input v-model="title" id="title" name="title" type="text" required class="form-input" placeholder="Title of the Chapter eg: Chapter 1">
        </div>

        <div class="form-group">
          <label for="content">Content:</label>
          <textarea v-model="content" id="content" name="content" rows="4" required class="form-inputs" placeholder="Enter the story of the chapter"></textarea>
        </div>

        <button type="submit" class="btn">Create Chapter</button>
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
    const content = ref('');
    const book_id = ref(''); 
    const books = ref([]);
    const showSuccess = ref(false);

    const addChapter = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/chapter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title.value,
            content: content.value,
            book_id: book_id.value,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add chapter');
        }

        showSuccess.value = true;

        setTimeout(() => {
          router.push('/chapters');
        }, 1000);

      } catch (error) {
        console.error('Error adding chapter:', error.message);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/book');
        if (!response.ok) {
          throw Error('No Data Available');
        }
        const data = await response.json();
        books.value = data;
      } catch (err) {
        console.log(err.message);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return { title, content, book_id, books, addChapter, showSuccess };
  },
};
</script>

<style scoped>
  .add-chapter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .add-chapter-box {
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

  .add-chapter-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    align-items: center;
  }

  .form-group {
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
  .form-group {
    text-align: left;
  }

  .form-inputs {
    width: 100%;
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    color: #333;
  }

  .form-inputs::placeholder {
    color: #aaa;
  }

  .form-inputs:focus {
    outline: none;
    border-color: #007bff;
  }

  .btn {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  hr {
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>
