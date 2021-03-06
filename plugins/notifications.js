import Vue from 'vue'
export default ({ app, store }) => {
  Vue.prototype.$notification = {
    success (options) {
      store.dispatch('notification/showNotification', { ...options, type: 'success' })
    },
    error (options) {
      store.dispatch('notification/showNotification', { ...options, type: 'danger' })
    },
    info (options) {
      store.dispatch('notification/showNotification', { ...options, type: 'info' })
    }
  }
}
