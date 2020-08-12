<template>
  <div class="vue-tempalte">
    <form v-bind:for="`input-${$_uid}`" @submit.prevent="processForm" >
      <h3>Sign Up</h3>

      <div class="form-group">
        <label>First Name</label>
        <input type="text" name="firstName" v-model="firstName" class="form-control form-control-lg" />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" v-model="lastName" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Email address</label>
        <input type="email" name="email" v-model="email" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" name="password" v-model="password" class="form-control form-control-lg" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{ name: 'login' }">sign in?</router-link>
      </p>
    </form>
<div id="app">
  {{ info }}
</div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueUid from 'vue-uid'
import axios from 'axios'

Vue.use(VueUid)

// console.log(this.$VueUid)

export default {
  name: 'Signup',
  el: '#app',
  computed: {
    id () {
      console.log(this.$_uid)
      return `input-${this.$_uid}` // e.g. input-1
    }
  },
  data () {
    return {
      info: null,
      campaignUuid: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response.data.bpi))
      .catch(error => console.log(error))
  },

  methods: {
    processForm: function () {
      var uuid = b()
      var data = {
        campaignUuid: uuid,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }
      console.log(data, this.email, '\n\n\n\n\n\n')
    }
  }
}
// this function will generate a random uuid once invoked.
function b (a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) }

</script>
