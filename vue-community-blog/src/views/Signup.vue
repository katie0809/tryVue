<template>
    <div class="row my-5">
        <div class="col-md-8 offset-md-2">
            <div class="card">
                <div class="card-body">
                    <div class="form-group">
                        <!-- 만약 errors && errors.name이 true라면 is-invalid class를 추가한다 : 로그인폼이 빨간박스 됨
                        API 대충 구현한게 완전하지 않아서ㅠㅠ 썼다가 지우거나 제대로된걸로 바꾸면 계속 빨간폼으로 남아있음ㅋ큐ㅠ-->
                        <input v-bind:class="{'is-invalid': errors && errors.name}" v-model="name" type="text" placeholder="Name" class="form-control">
                        <!-- 에러가 있다면 에러를 표시한다. -->
                        <div class="errors" v-if="errors && errors.name">
                            <small class="text-danger" :key="error" v-for="error in errors.name">{{ error }}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input v-bind:class="{'is-invalid': errors && errors.email}" v-model="email" type="text" placeholder="Email" class="form-control">
                        <div class="errors" v-if="errors && errors.email">
                            <small class="text-danger" :key="error" v-for="error in errors.email">{{ error }}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input v-bind:class="{'is-invalid': errors && errors.password}" v-model="password" type="password" placeholder="Password" class="form-control">
                        <div class="errors" v-if="errors && errors.password">
                            <small class="text-danger" :key="error" v-for="error in errors.password">{{ error }}</small>
                        </div> 
                    </div>
                    <div class="form-group text-right">
                        <button @click="registerUser()" class="btn btn-success form-control">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        name: 'signup',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                errors: {}
            }
        },
        methods: {
            registerUser() {
                /*
                Axios.post('https://react-blog-api.bahdcasts.com/api/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(({response}) => {
                    // response에서 데이터는 원래 response.data.data에 들어있다.
                    // ({})로 감싸줌으로서 Object response를 destructure 할 수 있다.
                    this.$root.auth = response;
                }).catch(response => {
                    console.log(response);
                });*/

                // 해당 api는 더이상 동작하지 않는다.
                // 강제로 값을 넣어준다.
                let response = {
                    config: {timeout: 0, xsrfCookieName: "XSRF-TOKEN", status: 200},
                    data: {
                        data: {
                            token: "woehiafksnl329aYEOWKcdlskfa.lwihef981234LHFleirhaldfky",
                            user: {
                                created_at: "2019-07-24 14:35:24",
                                email: this.email,
                                id: 256,
                                name: this.name,
                                updated_at: "2019-07-24 15:35:24"
                            }
                        }
                    },
                    headers: {content_type: "application/json", cache_control: "private, must-revalidate"}
                };

                if(this.name == '' || this.email == '' || this.email == 'katie0809@naver.com' || this.password == '')
                {
                    // 만약 안채운 칸이 있으면 에러메시지를 나타낼 수 있도록 에러배열을 저장한다.
                    // 실제로는 API return으로 에러가 떨어질 경우 에러데이터 저장하는거
                    this.errors = {name: [], email: [], password: []};
                    
                    this.name == '' ? this.errors.name.push('이름을 입력해 주세요') : null;
                    this.email == '' ? this.errors.email.push('이메일을 입력해 주세요') : null;
                    this.password == '' ? this.errors.password.push('비밀번호를 입력해 주세요') : null;
                    this.email === 'katie0809@naver.com' ? this.errors.email.push('이미 등록된 이메일입니다') : null;
                }
                else{

                    // 객체 디스트럭쳐 (Object destructuring) => ES6 문법
                    // response에서 key가 data인 애의 내용을 뽑아서 tmpData라는 객체에 저장한다
                    // tmpData에서 key가 data인 애의 내용을 뽑아서 저장한다. 이름 따로 지정 안했으므로 객체명은 그대로 data
                    const { data: tmpData } = response;
                    const { data } = tmpData;

                    // localStorage에 key 'auth'로 데이터를 저장한다.
                    localStorage.setItem('auth', JSON.stringify(data));
                    
                    // this.$root => root vue instance를 referencing한다
                    this.$root.auth = data;

                    // 유저가 성공적으로 등록되었다면 promatically redirect to Home page
                    // router.js에서 Vue.use(VueRouter)를 함으로써 전역적으로 뷰 라우터를 사용할 수 있게됨.
                    // 이동을 원하는 페이지명을 넘겨주면 이동한다.
                    this.$router.push('home');

                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>