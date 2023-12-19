<template>
  <div class="chapter-list">
    <div v-for="chapter in chapters" :key="chapter.id">
      <ChapterDetails :chapter="chapter" />
    </div>
  </div>
</template>
  
<script>
import { onMounted, onUnmounted, onUpdated } from 'vue';
import ChapterDetails from '../components/ChapterDetails.vue';

export default {
  props: ['chapters'],
  components: { ChapterDetails },
  setup(props) {
    onMounted(() => console.log('component mounted'))
    onUnmounted(() => console.log('component umounted'))
    onUpdated(() => console.log('component updated'))
  }
}
</script>
  