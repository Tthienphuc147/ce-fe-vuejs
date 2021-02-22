import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Notifications from "vue-notification";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import Vuelidate from "vuelidate";
import VModal from 'vue-js-modal'
import vuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(CoreuiVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VModal)
Vue.use(require('vue-moment'));

Vue.use(vuelidateErrorExtractor, {
  template: templates.singleErrorExtractor.foundation6,
  messages:
  {
    required: "The field is required",
    email: "The invalid email",
    minLength: 'The field should be at least {min} characters'
  }
});

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount('#app')
