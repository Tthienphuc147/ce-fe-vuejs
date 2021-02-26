import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import profileManager from './modules/dashboard/profile-manager'
import associateManager from './modules/dashboard/associate-admin'
import memberManager from './modules/dashboard/member'
import evaluation from './modules/dashboard/evaluation'
import evaluationAssociate from './modules/dashboard/evaluation-admin'
import periodAdmin from './modules/dashboard/period-admin'
import competencyPosition from './modules/dashboard/competency-position'
import competency from './modules/dashboard/competency-admin'
import { loader } from './modules/loader';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashboard,
    auth,
    profileManager,
    memberManager,
    evaluationAssociate,
    evaluation,
    associateManager,
    periodAdmin,
    competencyPosition,
    competency,
    loader
  }
})  