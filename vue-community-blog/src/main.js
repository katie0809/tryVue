import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

const authData = localStorage.getItem("auth");

// 여기에 등록한 정보들은 기본적으로 전체 앱에 등록된다
// 이 뷰 인스턴스의 데이터는 this.$root 키워드로 접근가능하다
new Vue({
  router,
  data: {
    // localStorage에 저장된 애가 있으면 저장된 데이터를 JSON형태로 auth에 저장.
    // 없다면 빈 배열ㅇ르 갖고있는다.
    auth: authData && authData !== 'undefined' ? JSON.parse(authData) : {}
  },
  render: h => h(App)
}).$mount('#app')
