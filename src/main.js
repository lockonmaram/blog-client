import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import swal from 'sweetalert2';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

window.swal = swal

Vue.use(Vuetify,{
  theme: {
    primary: "#8EDCE6",
    secondary: "#D5DCF9",
    accent: "#A7B0CA",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
