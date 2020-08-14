<template>
  <div class="vue-tempalte">
    <form v-bind:for="`input-${$_uid}`" @submit.prevent="processForm" novalidate="true">
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

      <button @click="checkForm" type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
      <p v-if="errors.length"> <li v-for="error in errors" v-bind:key="error"> {{ error }} </li>
      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{ name: 'login' }">sign in?</router-link>
      </p>
    </form>
<!-- <div id="app">
  {{ info }}
</div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueUid from 'vue-uid'
import axios from 'axios'
import VueSimpleAlert from 'vue-simple-alert'
import Swal from 'sweetalert2'

Vue.use(VueUid)
Vue.use(VueSimpleAlert)

// console.log(this.$VueUid)

export default {
  name: 'Signup',
  el: '#app',

  data () {
    return {
      info: null,
      campaignUuid: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    // this function will read the data from the form and save it.
    processForm: function () {
      // our fixed campaignUuid
      var uuid = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a'
      // client data.
      var datas = {
        campaignUuid: uuid,
        data: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        }
      }
      // this post method will work on sending data to the check user API to check if it is valid or not.
      axios
        .post('https://api.raisely.com/v3/check-user', { campaignUuid: uuid, data: { email: this.email } })
        .then(response => {
          // checking if the response coming from the external API is valid or not.
          if (response.data.data.status === 'OK') {
            axios
            // if the email is valid, we will send a post request to the sign up API.
              .post('https://api.raisely.com/v3/signup', datas)
              .then(response => {
                if (response.status === 200) {
                  // if the response status 200 we will show the client a pop up msg regarding the process is validated.
                  Swal.fire({
                    title: 'You Joined Us!!!!',
                    text: 'you email was accepted, Welcome home!',
                    icon: 'success',
                    confirmButtonText: 'yay'
                  })
                }
              })
              // if we receieved any error as a response from what we request,
              // we will display it defining the issue in a cool way and direct.
              .catch(e => {
                Swal.fire({
                  title: 'You are already signed up!',
                  text: 'Your email is already registered',
                  icon: 'info',
                  confirmButtonText: 'OK'
                })
              })
          } else {
            // if there is an error with the request we will display it to the client
            // in a nice way without showing him any status code as the user doesn't know what it means
            Swal.fire({
              title: 'Error!',
              text: 'You are not validated, Please check your email',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        }).catch(error => console.log(error))
    },
    // checkForm function will check if there is any empty input to notify the client before proceeding.
    checkForm: function (e) {
      this.errors = []
      if (!this.firstName) {
        this.errors.push('First Name required.')
      }
      if (!this.lastName) {
        this.errors.push('Last Name required.')
      }
      if (!this.email) {
        this.errors.push('Email required.')
      }
      if (!this.password) {
        this.errors.push('you forgot your password.')
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.')
      }
      if (!this.errors.length) {
        return true
      }
      e.preventDefault()
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
// this function will generate a random uuid once invoked. but the campaignUuid is fixed after testing with insomnia/postman
// function b (a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) }

</script>
