<template>
  <div class="AddArticle">
    <h1>Add Article</h1>
    <PostArticle/>
  </div>
</template>

<script>
import PostArticle from '@/components/PostArticle.vue'

export default {
  name: 'AddArticle',
  components: {
    PostArticle
  }
}
</script>
