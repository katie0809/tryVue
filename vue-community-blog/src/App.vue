<template>
  <div id="app">
    <!-- Vue.use(Router)를 함으로써 뷰가 자동으로 이런 router-view등 모듈(Router)과
     관련된 directive, component등을 사용할 수 있도록 전역으로 등록해준다. 
     Router 컴포넌트의 path에 맞춰서 매칭되는 컴포넌트가 router-view 부분에 붙는다. -->
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
  * {
    font-family: 'Poppins'
  }
</style>
