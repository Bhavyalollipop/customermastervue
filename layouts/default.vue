<template>
  <div class="app">
    <div class="header-block pr-3 pl-3">
      <div class="float-right mt-2 text-white">
        <span class="cursor-pointer" @click="logout()">
          <i class="fa fa-user" /> Logout
        </span>
      </div>
    </div>
    <b-container>
      <nuxt />
      <Notification />
    </b-container>
  </div>
</template>

<script>
import Notification from '@/components/notification'
export default {
  name: 'Empty',
  components: { Notification },
  data () {
    return {

    }
  },
  computed: {
  },
  mounted () {
    if (this.$cookies.get('token') === null) {
      this.$router.push({
        name: 'login'
      })
    }
  },
  methods: {
    logout () {
      this.$cookies.remove('token')
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
<style scoped lang="sass">
.header-block
  height: 48px
  background: #0163A5

</style>
