<template>
  <div class="user">
    <h1>Login</h1>
    <Login/>
    <br><br><br><br>
    <h1>Register</h1>
    <Register/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'user',
  components: {
    Register,
    Login
  }
}
</script>
