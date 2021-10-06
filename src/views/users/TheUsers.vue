<template>
  <div class="users-wrapp">
    <h1>All USERS IN SYSTEM</h1>
    <user-list
      v-if="currentUserList"
      :users="currentUserList"
      @user-update="getUsersListByParams"/>
    <pagination
      :itemOnPage="itemOnPage"
      :listSize="usersListSize"
      :propCurrentItem="currentItem"
      @list-update="getUsersListByParams"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Pagination from '../../components/ui/pagination.vue';
import UserList from '../../components/users/UsersList.vue';

export default {
  data () {
    return {
      itemOnPage: 10,
      currentItem: null
    };
  },
  components: {
    Pagination, UserList
  },
  computed: {
    ...mapGetters(['usersListSize', 'currentUserList'])
  },
  methods: {
    ...mapActions(['getUsersList', 'clearUsersList']),
    async getUsersListByParams (custum) {
      if (custum) {
        this.currentItem = custum.page;
      }
      this.$router.push({ name: 'TheUsers', query: { page: this.currentItem } });
      await this.getUsersList({
        limit: this.itemOnPage,
        skip: this.currentItem - 1
      });
      window.scrollTo(0, 0);
    }
  },
  async mounted () {
    if (this.$route.query) {
      if (this.$route.query.page) this.currentItem = this.$route.query.page;
    };
    await this.getUsersListByParams(this.currentItem || 1);
  },
  beforeUnmount () {
    this.clearUsersList();
  }
};

</script>

<style>

</style>
