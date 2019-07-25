<template>
    <div>
        <div class="row">
            <div class="col-md-8 offset-md-2" v-for="article in articles" :key="article.title">
                <news :article="article"></news>
            </div>
        </div>
    </div>
</template>

<script>

    import news from '@/components/Ariticle.vue';
    import Axios from 'axios'
    // config 환경설정 파일을 가져온다.
    import config from '@/config'

    export default {
        name: 'home',
        data() {
            return {
                articles: []                
            }
        },
        mounted() {
            this.getArticles();
        },
        methods: {
            getArticles() {

                // `${}` 으로 config.js의 변수 접근 가능                
                Axios.get(`${ config.apiUrl_news + config.apiKey_news }`).then(({data}) => {
                    // Object값의 data를 받아왔다
                    // local storage에는 JSON을 string타입으로 바꿔서 저장한다
                    // article에는 Object를 Array타입으로 바꿔서 저장한다
                    localStorage.setItem('articles', JSON.stringify(data.articles));
                    this.articles = data.articles;
                });
                
            }
        },
        components: {
            news
        }

    }
</script>

<style lang="scss" scoped>

</style>