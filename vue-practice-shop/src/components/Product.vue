<template>
    <div class="card">
        <div class="card-body">
            <!--  -->
            <h3 class="text-center card-title">{{product.name}}</h3>
            <p class="text-center text-muted card-text display-4">${{ Number(product.price).toFixed() }}</p>
            <button class="btn btn-primary" :disabled="chkInCart" @click="addToCart">
                {{ chkInCart ? 'Added to Cart' : 'Add to Cart'}}
            </button>
            <h4>{{ cnt }}</h4>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cnt: 0
                //chkInCart: false
            }
        },
        props: ['product', 'cart'],
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.product);
            }
        },
        computed: {
            chkInCart() {
                // 현재 product가 카트에 있는지 / 5개 이상 있는지 확인한다.
                // 현재 카트가 비어있거나, product가 카트에 들어있지 않은 경우 현재 product의 개수를 0으로 초기화한다.
                if(this.cart.length > 0)
                {
                    const idx = this.cart.findIndex(x => x.info.id === this.product.id);
                    if(idx > -1)
                    {
                        this.cnt = this.cart[idx].count;
                        if(this.cart[idx].count >= 5) return true;
                        else return false;
                    }
                    else this.cnt = 0;
                }
                else this.cnt = 0;
            }
        },
        watch: {
        }
    }
</script>

<style lang="scss" scoped>

</style>