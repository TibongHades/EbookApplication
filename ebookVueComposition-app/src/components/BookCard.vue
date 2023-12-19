<template>
  <div class="book-list">
    <div v-for="book in books" :key="book.id">
      <BookDetails :book="book" />
      <!-- <h1>tilte:{{ book.title }}</h1>
        <h2>desciption:{{ book.description }}</h2> -->
    </div>
  </div>
</template>
  
<script>
import { onMounted, onUnmounted, onUpdated } from 'vue';
import BookDetails from '../components/BookDetails.vue';

export default {
  props: ['books'],
  components: { BookDetails },
  setup(props) {
    onMounted(() => console.log('component mounted'))
    onUnmounted(() => console.log('component umounted'))
    onUpdated(() => console.log('component updated'))
  }
}
</script>
  