<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'visibility_off' : 'visibility'"
      :type="show ? 'text' : 'password'"
      name="input-10-1"
      counter
      @click:append="show = !show"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="login"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    show: false,
    passwordRules: [
      v => !!v || 'Password is required',
      v => /.{8,}/.test(v) || 'Password length must be 8 characters or higher',
    ]
  }),

  methods: {
    login () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('https://blogserver.lockonmaram.com/login', {
          email: this.email,
          password: this.password
        })
        .then(result=>{
          // console.log(result);
          swal(
            'Yeay!',
            'You have logged in!',
            'success'
          )
          .then(res=>{
            localStorage.setItem('token', result.data.token)
            this.$router.push({ path: '/' })
          })
        })
        .catch(err=>{
          swal(
            'Something went wrong!',
            `error message: ${err.message}`,
            'error'
          )
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
