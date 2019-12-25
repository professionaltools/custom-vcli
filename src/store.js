import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const storeOptions = {
  strict: true,
  devtools: true,
  modules: {},
}
export default new Vuex.Store(storeOptions)

