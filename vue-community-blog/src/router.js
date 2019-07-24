import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
/*
    Vue.use() : The way how we register plugins in Vue.js
    So, the most of the time you install vue packages, you need to use
    'use()' function to register the package to vue application. 
*/

Vue.use(VueRouter);

const router = new VueRouter({
    // history모드로 하면 url에 #이 안붙는다
    mode: 'history',
    routes: [
        { path: '/home', component: Home },
        { path: '/login', component: Login },
        { path: '/signup', component: Signup }
    ]
});

// 라우터를 export
export default router;