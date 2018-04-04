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
                    label="email"
                    v-model="newUser.email"
                    prepend-icon="email"
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
                v-text-field(
                    label="Password Confirmation"
                    v-model="newUser.passwordConf"
                    prepend-icon="lock"
                    :rules="rules"
                    :append-icon="signupPasswordVisible ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (signupPasswordVisible = !loginPasswordVisible)"
                    :type="signupPasswordVisible ? 'text' : 'password'"
                    required
                    color="light-blue lighten-1"
            )
          
            
                v-btn(@click.native="submitSignUp()") Sign Up
        
        v-snackbar(
            timeout ="6000"
            bottom="bottom"
            color = "red lighten-1"
            v-model = "snackbar"
        ) {{ message}}   
    
</template>
<script>
import Signup from "@components/pages/Signup";
export default {
data() {
    return {
        snackbar : false, 
        validSignup : false,
        signupPasswordVisible: false, 
        rules: [(value)=>!!value||'This field is required'],
        newUser: {
            username: '', 
            password: '', 
            passwordConf: '',
            email: ''
        },
        message: '',
    }
},
    methods: {
        submitSignup () {
            Signup.signup(this, this.newUser, '/')
        }
    }
};
</script>