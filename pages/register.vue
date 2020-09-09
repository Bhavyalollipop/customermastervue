<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center mt-5">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
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
                <h1>Register</h1>
                <p class="text-muted">
                  Create your account
                </p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-users" /></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="user.user_name" type="text" class="form-control" placeholder="Username" autocomplete="username" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-inbox" /></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="user.user_mail" type="text" class="form-control" placeholder="Email" autocomplete="email" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-lock" /></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="user.user_pwd" type="password" class="form-control" placeholder="Password" autocomplete="new-password" />
                </b-input-group>

                <b-button variant="success" block @click="submit()">
                  Create Account
                </b-button>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <router-link :to="{ name : 'login' }">
                    <b-button block class="btn btn-facebook">
                      <span>Sign In</span>
                    </b-button>
                  </router-link>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  layout: 'empty',
  data () {
    return {
      user: {
        user_name: '',
        user_mail: '',
        user_pwd: ''
      },
      saveDialogError: [],
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    submit () {
      const error = []
      this.saveDialogError = []
      if (!this.user.user_mail || !this.reg.test(this.user.user_mail)) {
        error.push('Please give a valid email')
      }
      if (!this.user.user_pwd) {
        error.push('Please give a valid password')
      }
      if (!this.user.user_name) {
        error.push('Please give a valid user name')
      }
      if (error.length > 0) {
        this.saveDialogError = error
        return false
      }
      this.$store.dispatch('users/postRegister', this.user).then((res) => {
        if ((res || {}).type === 'success') {
          this.$cookies.set('token', res.detail)
          this.$notification.success({ message: (res || {}).message })
          this.$router.push({
            name: 'customer'
          })
        }
      })
    }
  }
}
</script>
