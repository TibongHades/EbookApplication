<template>
  <div class="author-list">
    <div v-for="author in authors" :key="author.id">
      <AuthorDetails :author="author" />
      <!-- <h1>tilte:{{ book.title }}</h1>
        <h2>desciption:{{ book.description }}</h2> -->
    </div>
  </div>
</template>
  
<script>
import { onMounted, onUnmounted, onUpdated } from 'vue';
import AuthorDetails from '../components/AuthorDetails.vue';

export default {
  props: ['authors'],
  components: { AuthorDetails },
  setup(props) {
    onMounted(() => console.log('component mounted'))
    onUnmounted(() => console.log('component umounted'))
    onUpdated(() => console.log('component updated'))
  }
}
</script>
  