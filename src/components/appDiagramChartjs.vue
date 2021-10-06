<template>
<div class="chart-js-wrapper">
  <vue3-chart-js
    :type="'bar'"
    :data="dataForDiagram"
    :options="options"
    />
</div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
export default {
    components: {
      Vue3ChartJs
    },
    props: {
      dataForDiagram: {
        type: Object,
        requared: true
      },
      options: {
        type: Object,
        requared: true
      }
    },
    mounted () {
    }
};
</script>

<style lang="scss" scoped>
  .chart-js-wrapper {

    width: 100%;
    min-width: 700px;
    background: rgba(255, 255, 255, 0.733);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    margin: 1rem auto;
  }
</style>
