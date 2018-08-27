<template>
  <v-toolbar>
    <v-toolbar-title>Maram's Public Blog</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="secondary hidden-sm-and-down">
      <v-btn flat color="primary" to='/'>Home</v-btn>
      <v-btn v-if="token" flat color="primary" to='/article/add'>Add Article</v-btn>
      <v-btn v-if="!token" flat color="primary" to='/user/form'>Login</v-btn>
      <v-btn v-else flat color="primary" @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    token: localStorage.getItem('token')
  }),
  methods: {
    logout() {
      this.token = null
      localStorage.clear()
      swal("You have logged out", "See you later!")
      .then(ok=>{
        this.$router.go({ path: '/' })
      })
    },
    getToken(){
      this.token = localStorage.getItem('token')
    }
  },
  created(){
    this.getToken()
  }
}
</script>
