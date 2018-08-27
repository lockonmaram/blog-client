<template>
  <div class="hello">
    <v-flex>
      <p class="text-xs-left">{{toDate(article.created_at)}}</p>
      <v-card dark color="primary">
        <h1>{{article.title}}</h1>
        <p class="text-xs-right">written by: {{article.writter.first_name}} {{article.writter.last_name}}</p>
        <a href="article.imageUrl"><img :src="article.imageUrl" v-bind:alt="article.title" style="width:75%"/></a>
        <br><br><br>
        <h3>{{article.content}}</h3>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Article',
  data () {
    return {
      article: null
    }
  },
  methods: {
    toDate(date){
      let newDate = new Date(date)
      return newDate.toLocaleDateString()
    },
    getArticle(){
      axios.get(`http://blogserver.lockonmaram.com/articles/${this.$route.params.articleId}`)
      .then(article=>{
        console.log(article);
        this.article = article.data.data
      })
      .catch(err=>{
        console.log('something went wrong!');
      })
    }
  },
  watch:{
    '$route'(){
      axios.get(`http://blogserver.lockonmaram.com/articles/${this.$route.params.articleId}`)
      .then(article=>{
        console.log(article);
        this.article = article.data.data
      })
      .catch(err=>{
        console.log('something went wrong!', err);
      })
    }
  },
  created(){
    this.getArticle()
  },
  props: ['articles']
}
</script>
