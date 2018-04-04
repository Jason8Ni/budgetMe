<template lang = "pug">
  h1 Auth!
    div (class="auth-container")
     div (class = "auth")
       v-form(v-model="validLogin")
          v-text-field(
            label="Username"
            v-model="auth.username"
            prepend-icon="accountBox"
            :rules="rules"
            required
          )
          v-text-field(
            label="Password"
            v-model="auth.password"
            prepend-icon="lock"
            :rules="rules"
            :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
            :type="loginPasswordVisible ? 'text' : 'password'"
            required
            color="light-blue lighten-1"
          )
          v-btn(@click.native="signUpVisible = true") Create accountBox
          v-btn(@click.native="submitAuthentication()") Login

      v-snackbar(
        timeout ="6000"
        bottom="bottom"
        color = "red lighten-1"
        v-model = "snackbar"
      ) {{ message}}   
</template>
<script>
import Authentication from "@components/pages/Authentication";
export default {
  data() {
    return {
      snackbar: false,
      validLogin: false, 
      loginPasswordVisible: false, 
      rules: [ (value)=> !!value||'This field is required!'],
      auth : {
        username: "", 
        password: ""
      }, 
      message : ''
  }
  
},
  methods: {
    submitAuthentication () {
      Authentication.authenticate(this, this.auth, `/`)
    }
  }
}
</script>