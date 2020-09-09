<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center mt-5">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-alert variant="danger" :show="saveDialogError.length > 0">
                  <button type="button" aria-label="Close" class="close" @click="saveDialogError = []">
                    ×
                  </button>
                  <ul class="p-0 pl-1">
                    <li v-for="item in saveDialogError" :key="item.index">
                      {{ item }}
                    </li>
                  </ul>
                </b-alert>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">
                    Sign In to your account
                  </p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-users" /></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="email" type="text" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="fa fa-lock" /></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="submit()">
                        Login
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <router-link :to="{ name : 'register' }">
                    <b-button variant="primary" class="active mt-3">
                      Register Now!
                    </b-button>
                  </router-link>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'empty',
  data () {
    return {
      saveDialogError: [],
      email: '',
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      password: ''
    }
  },
  methods: {
    submit () {
      const error = []
      this.saveDialogError = []
      if (!this.email || !this.reg.test(this.email)) {
        error.push('Please give a valid email')
      }
      if (!this.password) {
        error.push('Please give a valid password')
      }
      if (error.length > 0) {
        this.saveDialogError = error
        return false
      }
      this.$store.dispatch('users/postLogin', { email: this.email, password: this.password }).then((res) => {
        if ((res.data || {}).type === 'success') {
          this.$cookies.set('token', res.data.detail)
          this.$notification.success({ message: (res.data || {}).message })
          this.$router.push({
            name: 'customer'
          })
        }
      })
    }
  }
}
</script>
