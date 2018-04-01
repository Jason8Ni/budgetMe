import Axios from 'axios'
import router from '@/router'
const BudgetManagerAPI = `http://${window.location.hostname}:3001`

export default {
    user: { authenticated: false }
  }