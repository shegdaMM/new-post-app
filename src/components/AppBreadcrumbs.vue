<template>
  <div class="breadcrumb">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{'linked': !!breadcrumb.link}">

        {{ breadcrumb.name }}

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumbList: []
    };
  },
  mounted () { this.updateList(); },
  watch: { '$route' () { this.updateList(); } },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link);
    },
    updateList () { this.breadcrumbList = this.$route.meta.breadcrumb; }
  }
};
</script>

<style scoped>
  .breadcrumb {
    display: flex;
    justify-content: flex-start;
    margin-top: -0.5rem;
  }
  ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 0.1rem 0 0.5rem 0.5rem;
    padding: 0;
  }
  ul > li {
    display: flex;
    float: left;
    height: 0.5rem;
    width: auto;
    color: black;
    font-weight: 700;
    font-size: 1rem;
    cursor: default;
    align-items: center;
  }
  ul > li:not(:last-child)::after {
    content: '/';
    float: right;
    font-size: .8em;
    margin: 0 .5em;
    cursor: default;
  }
  .linked {
    cursor: pointer;
    font-size: 1em;
    font-weight: normal;
  }
</style>
