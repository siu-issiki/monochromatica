<template>
  <div>
    <header class="home header">
      <div class="bg-img">
        <div class="foreground">
          <Navigation></Navigation>
        </div>
      </div>
    </header>
    <section class="body-container">
      <div class="wrapper">
        <h1 class="title">Admin login</h1>
        <div :class="'notification '+'is-'+message_type" v-if="message">
          <h1>{{ message }}</h1>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input" v-model="email" type="text" placeholder="email">
            <span class="icon is-small is-left">
              <font-awesome-icon icon="envelope"  style="font-size: 20px"/>
            </span>
          </div>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" v-model="password" type="password" placeholder="Password">
            <span class="icon is-small is-left">
              <font-awesome-icon icon="lock"  style="font-size: 20px"/>
            </span>
          </p>
        </div>
        <div class="control">
          <button class="button is-primary" @click="submit()">Login</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navigation from '~/components/navigation.vue'
import GoTrue from 'gotrue-js'
import Cookie from 'js-cookie'

var auth = new GoTrue({
  APIUrl: 'https://monochromatica.netlify.com/.netlify/identity',
  audience: '',
  setCookie: false
})

export default {
  data () {
    return {
      email: '',
      password: '',
      message: '',
      message_type: ''
    }
  },
  methods: {
    submit: function () {
      auth.login(this.email, this.password).then(response => {
        this.$store.commit('setAdminToken', response.token.access_token)
        Cookie.set('auth', response.token.access_token)
        this.$router.push('/admin/posts')
      }).catch(error => {
        this.showMessage(error, 'danger')
      })
    },
    showMessage: function (error, type) {
      this.message = error.json.error_description
      this.message_type = type
    }
  },
  components: {
    Navigation
  },
  mounted: () => {
  }
}
</script>
