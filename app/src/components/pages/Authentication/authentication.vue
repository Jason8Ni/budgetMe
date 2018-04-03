<template lang = "pug">
  h1 Auth!
    div (class="auth-container")
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
</template>
<script>
export default {};
</script>