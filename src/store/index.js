import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import profileManager from './modules/dashboard/profile-manager'
import evaluation from './modules/dashboard/evaluation'
import { loader } from './modules/loader';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashboard,
    auth,
    profileManager,
    evaluation,
    loader
  }
})  