<template>
  <div class="hello">
    <v-flex v-if="updateCheck === true">
      <UpdateArticle v-bind:article="article"></UpdateArticle>
      <v-btn @click='updateCheck = false'>Cancel</v-btn>
    </v-flex>
    <v-flex v-else>
      <p class="text-xs-left">{{toDate(article.created_at)}}</p>
      <v-card dark color="primary">
        <h1>{{article.title}}</h1>
        <p class="text-xs-right">written by: {{article.writter.first_name}} {{article.writter.last_name}}</p>
        <a href="article.imageUrl"><img :src="article.imageUrl" v-bind:alt="article.title" style="width:75%"/></a>
        <br><br><br>
        <h3>{{article.content}}</h3>
        <br><br><br>
        <v-btn v-if="check == true" @click='deleteArticle'>Delete Article</v-btn>
        <v-btn v-if="check == true" @click='updateCheck = true'>Update Article</v-btn>
        <br><br><br>
      </v-card>
      <br><br><br><br>
      <v-card v-for='comment in article.comment'>
        <p class="text-xs-left">{{comment.userId.first_name}} {{comment.userId.last_name}}:</p>
        <p class="text-xs-left">{{comment.comment}}</p>
        <v-btn v-if="check == true || commentCheck(comment.userId._id)" @click='deleteComment(comment._id)'>Delete Comment</v-btn>
      </v-card>
      <br><br><br><br>
      <h2>Add Comment</h2>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="comment"
          :rules="commentRules"
          label="Comment"
          required
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          @click="addComment"
        >
          comment
        </v-btn>
      </v-form>
    </v-flex>
  </div>
</template>

<script>
import axios from 'axios'
import UpdateArticle from './UpdateArticle.vue'

export default {
  name: 'Article',
  components: {
    UpdateArticle
  },
  comment: '',
  commentRules: [
    v => !!v || 'Comment is required'
  ],
  data () {
    return {
      article: null,
      check: false,
      updateCheck: false,
      id: localStorage.getItem('id')
    }
  },
  methods: {
    toDate(date){
      let newDate = new Date(date)
      return newDate.toLocaleDateString()
    },
    getArticle(){
      axios.get(`https://blogserver.lockonmaram.com/articles/${this.$route.params.articleId}`)
      .then(article=>{
        console.log(article);
        this.article = article.data.data
      })
      .catch(err=>{
        console.log('something went wrong!');
      })
    },
    updateArticle(){
      this.emmit
    },
    addComment(){
      axios.post(`https://blogserver.lockonmaram.com/articles/${this.$route.params.articleId}/comment`,{
        comment: this.comment
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(album=>{
        swal("Yeay", "Your comment has been submited!", "success")
        .then(ok=>{
          this.comment = ''
          this.$router.push({path: `/${this.$route.params.articleId}`})
        })
      })
      .catch(err=>{
        swal("Failed!", "Comment failed to input", "error");
      })
    },
    deleteArticle: function(){
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`https://blogserver.lockonmaram.com/articles/${this.$route.params.articleId}`,{
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(result=>{
              console.log('----res',result);
              swal('Deleted!',
                  'Your article has been deleted.',
                  'success')
              .then(ok=>{
                this.$router.push({path: '/'})
              })
            })
            .catch(err=>{
              swal(
                'Something went wrong!',
                `error message: ${err.message}`,
                'error'
              )
            })
          } else {
            swal("Your article is safe!");
          }
        });
      },
    deleteComment: function(commentId){
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`https://blogserver.lockonmaram.com/articles/${this.$route.params.articleId}/comment/${commentId}`,{
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(result=>{
              console.log('----res',result);
              swal('Deleted!',
                  'Your comment has been deleted.',
                  'success')
              .then(ok=>{
                this.$router.push({path: `/${this.$route.params.articleId}`})
              })
            })
            .catch(err=>{
              swal(
                'Something went wrong!',
                `error message: ${err.message}`,
                'error'
              )
            })
          } else {
            swal("Your comment is safe!");
          }
        });
      },
      commentCheck(commentId){
        if (commentId === this.id) {
          return true
        }else {
          return false
        }
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
    },
    article(){
      // console.log(this.article.writter._id);
      if (this.id == this.article.writter._id) {
        this.check = true
      }else {
        this.check = false
      }
    }
  },
  created(){
    this.getArticle()
  },
  props: ['articles']
}
</script>
