<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="item in items" :key="item.key">
                {{ item['info']['name'] }} ${{ item.info.price }} [{{item.count}}]
                <button class="btn badge badge-danger float-right" @click="$emit('remove-from-cart', item.info)">Remove from cart</button>
            </li>
        </ul>
        <div class="card p-3 my-5">
            <h4 class="text-center">${{ total }}</h4>
        </div>

        <button class="btn-info form-control" :disabled="items.length === 0" @click="$emit('pay-now')">Pay Now</button>
    </div>
</template>

<script>
    export default {
        props: ['items'],
        computed: {
            total() {
                if(this.items.length <= 0) return 0;
                else 
                    return this.items.reduce(function(pre, curVal){
                        const price = Number(curVal.info.price).toFixed() * curVal.count;
                        return pre + price;
                    }, 0);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style> 