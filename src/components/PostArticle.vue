<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <br><br>
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload($event.target.files[0])"/>
    <v-text-field
      v-model="title"
      :rules="tileRules"
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
      Submit
    </v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostArticle',
  data: () => ({
    valid: true,
    image: null,
    title: '',
    tileRules: [
      v => !!v || 'Title is required',
    ],
    content: '',
    contentRules: [
      v => !!v || 'Content is required',
    ],
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        let formData = new FormData()
        formData.append('image', this.image)
        console.log(formData);

        axios({
          method: 'post',
          url: 'https://blogserver.lockonmaram.com/articles/upload',
          data: formData,
        })
        .then(result=>{
          console.log(result.data.link);
          axios.post('https://blogserver.lockonmaram.com/articles',{
            imageUrl: result.data.link,
            title: this.title,
            content: this.content
          },{
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(album=>{
            swal("Yeay", "New article has been submited!", "success")
            .then(ok=>{
              this.$router.push({path: '/'})
            })
          })
          .catch(err=>{
            swal("Failed!", "Article failed to input", "error");
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
  }
}
</script>
