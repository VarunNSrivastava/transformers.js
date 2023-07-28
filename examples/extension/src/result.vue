<!-- result.vue -->
<template>
    <div class="result-item" @click="handleClick">
        {{ result }}
    </div>
</template>

<script>
export default {
    props: {
        result: {
            type: String,
            required: true,
        },
    },
    methods: {
        handleClick() {
            this.$emit('click', this.result);
        },
    },
};
</script>

<style scoped>
.result-item {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.result-item:hover {
    background-color: #e0e0e0;
}
</style>
