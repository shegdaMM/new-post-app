<template>
  <router-link :to="{ path: to}" class="full-width-button">
      <slot></slot>
  </router-link>
</template>

<script>
export default {
    props: {
        to: String
    }
};
</script>

<style lang="scss" scoped>
    .full-width-button{
        display: block;
        background: rgba(4, 71, 172, 0.753);
        margin: 0 1.7rem;
        padding: 0 1rem;
        text-align: right;
        color: #fff;
        text-decoration: none;
        border-radius: 1rem;
        margin-top: -1.25rem;
        position: relative;
        z-index: 5;
    }
</style>
