<template>
  <input :value="modelValue" @input="updateInput" class="input"/>
</template>

<script>
export default {
    name: 'app-input',
    props: {
        modelValue: [String, Number]
    },
    emits: ['update:modelValue'],
    methods: {
        updateInput (event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }

};
</script>

<style lang="scss" scoped>

</style>
