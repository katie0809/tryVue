/*
// card component를 등록한다
Vue.component('card', {
    template:
    `
    <div class="card">
        <h3 class="card-title">Vue.js fundmentals</h3>
        <div class="card-text">
                Bootstrap sets basic global display, typography, and link styles. When more control is needed, check out the textual utility classes.
        </div>
    </div>
    `
});
*/
new Vue({
    el: "#app",
    data: {
        articles: [{
            title: 'Title 1',
            content: 'This is the content section 1'
        },
        {
            title: 'Title 2',
            content: 'This is the content section 2'        
        },
        {
            title: 'Title 3',
            content: 'This is the content section 3' 
        }]
    },
    methods: {
        deleteCard(deletedTitle) {
            // 삭제될 제목을 제외한 array를 재구성한다.
            this.articles = this.articles.filter(function(arr){
                return arr.title !== deletedTitle;
            })
        }
    },
    components: {
        card: {
            props: ['title', 'content'],
            template:
            // 템플릿 내에서 component의 props에 접근 가능할 뿐만 아니라
            // mustache expression 역시 사용할 수 있다.
            `
            <div class="card">
                <h3 class="card-title">
                    {{ title }}
                    <button id="DeleteBtn" @click="deleteCard">X</button>
                </h3>
                <h3 style="float:center">{{ vote }}</h3>
                <button @click="vote++">Vote for me</button>
                <div class="card-text">
                    {{ content }}
                </div>
            </div>
            `,
            /*
            뷰 '컴포넌트'에서는 데이터를 이런 정적 데이터로 주면 에러나게된다!!!
            왜냐면 위의 new Vue instance는 단 한번만 id=app인 div 내에 붙는것과 달리
            컴포넌트 형식의 뷰 객체는 여러번 재사용 가능하기 때문.
            
            즉, 새로 붙을때마다 새 data공간 따로 필요할텐데 정적으로 하나로 리턴하면
            당연히 안되겠지?!?!

            맨날 뜨던 The 'data' option should be a function that returns value in component definition
            오류가 바로 이 문제였던 것!

            => 뷰 컴포넌트에서는 data가 Object를 반환하는 function이어야 한다.
            data: {

            },
            */
           data() {
               return {
                   // vote값은 각 card component마다 고유하다
                   vote: 0
               }
           },
            methods: {
                deleteCard() {
                    this.$emit("delete-card", this.title);
                }
            }
        }
    },
    computed: {

    },
    watch: {

    },
    created: function() {

    },
    mounted: function() {

    }
});