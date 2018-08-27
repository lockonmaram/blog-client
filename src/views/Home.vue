<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="https://storage.googleapis.com/blog.lockonmaram.com/1534951997024catdog.jpg"> -->
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs4>
          <Posts v-bind:articles="articles"></Posts>
        </v-flex>
        <v-flex xs8>
          <Welcome/>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue'
import Welcome from '@/components/Welcome.vue'
import axios from 'axios'

export default {
  name: 'home',
  data: () => ({
    articles: [],
    // articleChild: this.$route.params.articleId
  }),
  components: {
    Welcome,
    Posts,
  },
  methods: {
    getArticles(){
      axios.get('https://blogserver.lockonmaram.com/articles')
      .then(result=>{
        this.articles = result.data.data
      })
      .catch(err=>{
        console.log('something went wrong!');
      })
    }
  },
  created(){
    this.getArticles()
  }
}
</script>
