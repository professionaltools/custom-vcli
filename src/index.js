import Vue from 'vue'
import 'src/common/style/index.scss'
import App from './app'
import router from './router'
import store from './store'
import preload from 'src/common/mixins/preload'

Vue.mixin(preload)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
