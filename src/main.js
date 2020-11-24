import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import router from './router'

//import  '@/assets/system_variables.js' loaded in system functions
import  '@/assets/system_functions.js'
import  '@/assets/system_htm_elements_action.js'

Vue.use(Antd);

//axios
import axios from 'axios'
Vue.prototype.$axios=axios
//axios.defaults.baseURL = 'http://192.168.0.2/user_role_back/';

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
