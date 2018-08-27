<template>
  <div class="posts">
    <h1>Articles:</h1><br><br>
    <v-flex v-for="(article, index) in articles">
      <v-card dark color="primary">
        <br><br>
        <h1>{{article.title}}</h1><br><br>
        <p class="text-xs-center">written by: <br>{{article.writter.first_name}}</p>
        <router-link :to="article._id">read more</router-link><br><br>
        <p class="text-xs-right">{{toDate(article.created_at)}}</p>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  methods: {
    toDate(date){
      let newDate = new Date(date)
      return newDate.toLocaleDateString()
    }
  },
  props: ['articles']
}
</script>
