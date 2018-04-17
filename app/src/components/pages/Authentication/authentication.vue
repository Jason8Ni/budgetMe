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
      rules: [value => !!value || "This field is required!"],
      auth: {
        username: "",
        password: ""
      },
      message: ""
    };
  },
  methods: {
    submitAuthentication() {
      Authentication.authenticate(this, this.auth, `/`);
    }
  }
};
</script>

<style lang="scss">
  @import "./../../../assets/styles";
  .l-auth {
    background-color: $background-color;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;
    label, input, .icon {
      color: #29b6f6!important;
    }
    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }
  }
  .l-signup {
    @extend .l-auth;
    animation: slideInFromLeft 1s forwards ease;
  }
</style>