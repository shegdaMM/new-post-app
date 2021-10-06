<template>
  <h2 class="page-title">
      <slot></slot>
  </h2>
</template>

<script>
export default {
    name: 'PageTitle'
};
</script>

<style lang="scss" scoped>
    .page-title {
        text-align: center;
    }
</style>
