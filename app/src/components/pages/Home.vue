<template>
  <div>
    <h3>placeholder</h3>
    <ul>
      <li v-if="users != null" v-for="(user, index) in users" :key='index'>
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>
<script>
  import Axios from 'axios'
  import Authentication from '@/components/pages/Authentication'
const baseUrl = `http://localhost:3001`
export default {
    data () {
      return {
        users: []
      }
    },
    mounted () {
      this.getAllUsers()
    },
    methods: {
      getAllUsers (component) {
        Axios.get(`${baseUrl}/api/v1/users`, {
          headers: {
            'Authorization': Authentication.getAuthenticationHeader(this)
          }
        }).then(({data}) => (this.users = data))
      }
    }
  }
</script>