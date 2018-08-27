<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="first_name"
      :rules="nameRules"
      :counter="10"
      label="First Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="last_name"
      :rules="nameRules"
      :counter="10"
      label="Last Name"
      required
    ></v-text-field>
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
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

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
  name: 'register',
  data: () => ({
    valid: true,
    first_name: '',
    last_name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => /.{8,}/.test(v) || 'Password length must be 8 characters or higher',
      v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'Password must have at least 1 number'
    ],
    checkbox: false
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('https://blogserver.lockonmaram.com/signup', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        })
        .then(result=>{
          swal(
            'You have been registered!',
            'Please login!',
            'success'
          )
        })
        .catch(err=>{
          console.log(err);
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
