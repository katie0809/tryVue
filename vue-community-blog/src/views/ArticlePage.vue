<template>
    <div>
        <!-- 라우터의 param변수를 활용해서 지금 자신이 어느 페이지인지를 찾아와 보여준다 -->
        <h3>{{ article_title }}</h3>
    </div>
</template>

<script>
    export default {
        name: 'article-page',
        data() {
            return {
                article_title: "",
                article_content: ""
            }
        },
        methods: {
        },
        mounted() {
            this.article_title = this.$route.params.article.title;
        }
    }
</script>

<style lang="scss" scoped>

</style>