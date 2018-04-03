<template lang = "pug">
  h1 Auth!
    div (class="asignup-container")
     div (class = "signup")
       v-form(v-model="validSignup")
          v-text-field(
            label="Username"
            v-model="newUser.username"
            prepend-icon="accountBox"
            :rules="rules"
            required
          )
          v-text-field(
            label="Password"
            v-model="newUser.password"
            prepend-icon="lock"
            :rules="rules"
            :append-icon="signupPasswordVisible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (signupPasswordVisible = !loginPasswordVisible)"
            :type="signupPasswordVisible ? 'text' : 'password'"
            required
            color="light-blue lighten-1"
          )
          v-btn(@click.native="submitSignUp()") Sign Up
</template>
<script>
export default {};
</script>