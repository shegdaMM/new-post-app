<template>
    <section class="user-list-wrapper">
        <div class="user-item-wrapper"
          v-for="user in users"
          :key="user._id"
        >
          <user-by-id :user="user"
            v-if="user._id"
            @user-update="$emit('user-update')"/>
          <span class="user-item-link"
            @click="routeToUserProfilePage(user._id)">
            More
          </span>
        </div>
  </section>
</template>

<script>
import UserById from './UserById.vue';

export default {
  components: { UserById },
  name: 'user-list',
  props: {
      users: Array
  },
  emits: ['user-update'],
  methods: {
    routeToUserProfilePage (id) {
      this.$router.push({ name: 'UserById', params: { uid: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-list-wrapper {
      display: flex;
      justify-content: stretch;
      align-items: stretch;
      flex-wrap: wrap;
    }
    .user-item-wrapper{
      margin: 0.5rem;
      flex-basis: calc( 50% - 1rem);
      flex-grow: 1;
      width: calc( 50% - 2rem);

      position: relative;
    }
    .user-item-link{
      position: absolute;
      right: 0;
      bottom: 0;

      background: #fff;
      display: inline-block;
      padding: 0.3rem 2rem;
      font-family: "Bebas Neue", cursive;
      font-size: 1.2rem;
      color: #00af89;
      cursor: pointer;
      clip-path: polygon(0 1rem, 1rem 0, 100% 0, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0 100%);
    }

    @media (max-width: 900px) {
      .user-list-wrapper {
        flex-direction: column;
      }
      .user-item-wrapper{
        width: calc( 100% - 1rem);
      }
    }
</style>
