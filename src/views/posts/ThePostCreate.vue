<template>
  <div class="postCreate">
      <app-title-page>
        CREATE NEW POST
      </app-title-page>
      <app-post-edit @form-submit="createNewPost">
        CREATE
      </app-post-edit>
  </div>
</template>

<script>
import AppTitlePage from '../../components/ui/AppTitlePage.vue';
import AppPostEdit from '@/components/posts/AppPostEdit';
import { mapActions } from 'vuex';

export default {
  components: {
    AppTitlePage, AppPostEdit
  },
  methods: {
    ...mapActions(['createPost']),
    async createNewPost (data) {
      await this.createPost(data);
    }
  },
  created () {
     if (!this.$store.getters.loggedInUser?._id) {
      this.$router.go(-1);
    }
  }
};
</script>

<style>

</style>
