<template>
<div class="spinner-wrapper" v-if="loadProcess === true">
  <q-spinner-cube class="spinner" color="white" size="4rem"/>
 </div>
</template>

<script>

export default {
  name: 'app-loader',
  components: {
  },
  computed: {
    loadProcess () {
      return this.$store.getters.loadProcess;
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.spinner-wrapper{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  top: 0;
  bottom: 0;
  background: rgba(0, 95, 51, 0.9);
  z-index: 5;
}
.spinner {
  position: absolute;
  left: calc(50vw - 2rem);
  top: calc(50vh - 2rem)
}
</style>
