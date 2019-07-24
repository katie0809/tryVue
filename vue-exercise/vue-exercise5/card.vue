<template>
    <div class="card">
        <h3 class="card-title">
            {{ title }}
            <button id="DeleteBtn" @click="deleteCard">X</button>
        </h3>
        <div class="card-text">
            {{ content }}
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'content'],
        data() {
            return {
                clops: 0
            }
        },
        methods: {
            deleteCard() {
                this.$emit("delete-card", this.title);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>