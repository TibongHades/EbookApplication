<template>
  <div class="add-author-container">
    <div v-if="showSuccess" class="success-message">
      Author successfully added!
    </div>
    <div v-else class="add-author-box">
      <h1>Create a New Author</h1>
      <hr>
      <form @submit.prevent="addAuthor" class="add-author-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="name" id="name" name="name" type="text" required class="form-input"
            placeholder="Input Author's Pen name">
        </div>

        <div class="form-group">
          <label for="bio">Bio:</label>
          <textarea v-model="bio" id="bio" name="bio" rows="4" required class="form-input"
            placeholder="Input Author's Bio"></textarea>
        </div>

        <button type="submit" class="btn">Create Author</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const name = ref('');
    const bio = ref('');
    const showSuccess = ref(false);

    const addAuthor = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/author', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.value,
            bio: bio.value,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add author');
        }

        showSuccess.value = true;

        setTimeout(() => {
          router.push('/authors');
        }, 1000);

      } catch (error) {
        console.error('Error adding Author:', error.message);
      }
    };

    return { name, bio, addAuthor, showSuccess };
  },
};
</script>

<style scoped>
.add-author-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.add-author-box {
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


.add-author-form {
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
  margin-bottom: 30px;
  margin-top: 20px;
}</style>
