<template>
  <div class="app">
    <nuxt />
    <Notification />
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
    if (this.$cookies.get('token') !== null) {
      this.$router.push({
        name: 'customer'
      })
    }
  }
}
</script>
