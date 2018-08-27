<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <br><br>
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload($event.target.files[0])"/>
    <v-text-field
      v-model="title"
      :rules="titleRules"
      label="Title"
      required
    ></v-text-field>
    <v-text-field
      v-model="content"
      :rules="contentRules"
      label="Content"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Update
    </v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateArticle',
  data: () => ({
    article: article,
    valid: true,
    image: null,
    title: article.title,
    titleRules: [
      v => !!v || 'Title is required',
    ],
    content: article.content,
    contentRules: [
      v => !!v || 'Content is required',
    ],
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        let formData = new FormData()
        formData.append('image', this.image)
        // console.log(formData);

        axios({
          method: 'post',
          url: 'https://blogserver.lockonmaram.com/articles/upload',
          data: formData,
        })
        .then(result=>{
          // console.log(result.data.link);
          axios.put(`https://blogserver.lockonmaram.com/articles/${this.$route.params.articleId}`,{
            imageUrl: result.data.link,
            title: this.title,
            content: this.content
          },{
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(album=>{
            swal("Yeay", "Article has been updated!", "success")
            .then(ok=>{
              this.$router.push({path: `/${this.$route.params.articleId}`})
            })
          })
          .catch(err=>{
            swal("Failed!", "Article failed to update", "error");
          })
        })
        .catch(function(){
          swal("Failed!", "Your file has not been uploaded", "error");
        });
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    handleFileUpload: function(img){
      this.image = img
      console.log('ini image',this.image);
    },
  },
  props: ['article']
}
</script>
