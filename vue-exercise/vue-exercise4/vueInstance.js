
// 해당 뷰 인스턴스는 생성과 동시에 mounted() 함수를 호출하게 된다.
// 호출시 API request 날리면 좋겠지?!
new Vue({
    el: "#app",
    data: {
        currencies : {},
        from_currency: "KRW",
        to_currency: "USD",
        amount: null,
        apiKey: "33b99d14d6ae2436bc1f",
        result: null,
        loading : false // http 결과값을 받아오는 동안은 변환 버튼을 다시 누르지 못하도록 한다
    },
    methods: {
        getCurrencies() {

            const savedCurrencies = localStorage.getItem('currencyList');
            
            if (savedCurrencies) {
                // 이미 저장된 환율정보가 있다면 해당 정보를 활용하고 리턴한다.
                // API request를 추가로 보내지 않는다.
                this.currencies = JSON.parse(savedCurrencies);
                return;
            }
            else {
                // 환율 api request를 보낸다
                axios.get('https://free.currconv.com/api/v7/currencies?apiKey=1051c20ae34d30e2014b')
                    .then(response => {

                        // 받아온 응답 환율값을 사용자의 로컬 저장소에 
                        // Json 형식으로 변환하여 저장한다.
                        this.currencies = response.data.results;
                        localStorage.setItem('currencyList', JSON.stringify(response.data.results));

                    });

            }

        },
        convertCurrencies() {
            this.from_currency = encodeURIComponent(this.from_currency);
            this.to_currency = encodeURIComponent(this.to_currency);
            this.loading = true;
            
            const key = this.from_currency + '_' + this.to_currency;
            const url = 'https://free.currconv.com/api/v7/convert?q='+key + '&compact=ultra&apiKey=' + this.apiKey;
            
            axios.get(url).then(response => {
                console.log(response);

                // 받아온 환율값 * 현재 입력값을 결과값으로 저장
                // computed property calculatedResult에서 바뀐 result에 따라 자동으로 변환값 환산
                this.result = response.data[key] * this.amount;
            })

        }
    },
    // computed 속성과 methods속성은 유사하다.
    // computed 속성의 장점(1) 사용하는 파라미터의 속성값이 변경되면 전체값을 다시 한번 계산한다. 자동으로!!!
    // computed 속성의 장점(2) 연산 결과값을 미리 저장하고 있다가 필요할 때 불러와서 사용. 동일한 연산 반복 방지! 캐싱!!!
    // methods 속성은 "호출할때만" 해당 로직을 수행한다.
    // computed 속성은 "대상 데이터가 변경되면 자동적"으로 해당 로직을 수행한다!!!
    computed: {
        formattedCurrencies : function() {
            // 환율 JSON 데이터를 받아오면 자동적으로 해당 데이터를 object 타입으로 변환한다.
            // 변환되어 반환된 데이터는 자동적으로 formattedCurrencies라는 이름의 데이터로 상위 뷰파일에 포함되게 된다.
            return Object.values(this.currencies);
        },
        calculatedResult : function() {
            if(typeof this.result === "number")
            {
                this.loading = false;
                return this.result + " " + this.to_currency;
            }
            else return 0;
        },
        // 사용자가 입력한 amount값이 바뀔때마다 확인하고
        // 0이거나 값이 없다면 변환 버튼 disable -> true 신호를 보낸다.
        isBtnVisible : function() {
            return this.amount == 0 || !this.amount || this.loading;
        }
    },
    // watch 속성은 말 그대로 특정 데이터의 변화를 감지하여 변화가 생기면 자동으로 특정 로직을 수행한다
    // computed 속성은 val() { return a*b } -> a나 b가 변화하면 val값(이자 함수)을 새로 갱신
    // watch 속성은 val() { return a*b } -> val가 변화하면 a*b 반환하는 로직 수행
    watch: {
        // 선택된 to_currency나 from_currency가 변하면 information을 삭제한다.
        to_currency() {
            this.amount = null;
            this.result = 0;
        },
        from_currency() {
            this.amount = null;
            this.result = 0;
        }
    },
    mounted() {
        
        // 환율 api request를 보낸다
        this.getCurrencies();
        /*
        axios.get('https://free.currconv.com/api/v7/currencies?apiKey=1051c20ae34d30e2014b')
        .then(response => {
            
            // 받아온 응답 환율값을 리턴
            // console.log(response)
            this.currencies = response.data.results;
        })
        */
    }
});
