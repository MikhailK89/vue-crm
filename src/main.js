import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyDxKGDj44PknepHXl1vEMzNXK8GgoL6GXs",
  authDomain: "vue-crm-db.firebaseapp.com",
  databaseURL: "https://vue-crm-db.firebaseio.com",
  projectId: "vue-crm-db",
  storageBucket: "vue-crm-db.appspot.com",
  messagingSenderId: "859678497698",
  appId: "1:859678497698:web:46c2de937f2375401530fb",
  measurementId: "G-P30QZ5ZLKP"
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
