<template>
    <div class="user-elem-wrapper">
      <section class="user-wrap" v-if="thisUser">
        <app-user-logo
        :avatar="thisUser.avatar ? thisUser.avatar : ''"
        :key="thisUser.avatar"
        :name="this.thisUser.name"
        :ID="this.thisUser._id" class="user-logo"
          @user-update="userUpdate"
          @remove-user="removeUserDialog"/>
          <app-user :user="thisUser" :ID="this.thisUser._id" class="user-info"/>
      </section>
      <app-posts-date-diagram :postedBy="uid" v-if="uid"/>
    </div>
</template>

<script>
import AppUser from './AppUser.vue';
import AppUserLogo from './AppUserLogo.vue';
import { mapGetters, mapActions } from 'vuex';
import AppPostsDateDiagram from '@/components/AppPostsDateDiagram';

export default {
  name: 'UserById',
  data () {
      return {
        userData: this.user
      };
  },
  emits: ['user-update'],
  props: {
      uid: {
        type: String
      },
      user: {
        type: Object
      }
  },
  components: {
    AppUser, AppUserLogo, AppPostsDateDiagram
  },
  computed: {
    ...mapGetters(['currentUser']),
    thisUser () {
      let result;
      if (this.userData) {
        result = this.userData;
      } else {
        result = this.currentUser;
      }
      return result;
    }
  },
  methods: {
    ...mapActions(['getUserById', 'clearCurrentUser', 'removeUserById']),
    async userUpdate () {
      await this.getUserById({ id: this.uid ? this.uid : this.user._id });
      this.userData = null;
      this.$emit('user-update');
    },
    removeUserDialog () {
      this.$q.dialog({
        title: 'Remove your accont',
        message: 'Are you sure you want to delete your account?',
        cancel: true,
        persistent: true,
        color: 'black'
      })
      .onOk(() => {
        this.removeUser();
      });
    },
    async removeUser () {
      await this.removeUserById({ id: this.uid ? this.uid : this.user._id });
      this.$emit('user-update');
    }
  },
  async mounted () {
     if (this.uid) {
        await this.getUserById({ id: this.uid });
     }
  },
  beforeUnmount () {
    this.clearCurrentUser();
  }
};
</script>

<style lang="scss" scoped>
.user-elem-wrapper {
  width: 100%;
  height: 100%;
}
.user-wrap {
  height: 100%;
  padding: 1.2rem 0.5rem;
}
.user-wrap {
  background: rgba(255, 255, 255, 0.397);
  clip-path: polygon(0 1rem, 1.5rem 0, calc(100% - 1.5rem) 0,
  100% 1rem, 100% calc(100% - 1rem), calc(100% - 1.5rem) 100%,
  1.5rem 100%,  0 calc(100% - 1rem));
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  min-width: 300px;
}
 @media (max-width: 900px) {
      .user-wrap{
        width: 100%;
      }
    }
.user-logo {
  flex-shrink: 1;
  flex-grow: 1;
  max-width: 200px;
  min-width: 180px;
}
.user-info {
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 300px;
}
 @media (max-width: 1100px) {
   .user-wrap{
     flex-wrap: wrap;
   }
 }
  @media (max-width: 651px) {
    .user-wrap{
      flex-direction: row;
    }
  }
.usercontrol {
    display: inline-block;
    text-align: center;

    list-style-type: none;
    li {
      display: inline-block;
      margin: 0.5em 0.2rem;
      padding: 0.4rem;
      text-align: center;
      background: #00af89;
      font-size: 1.2rem;
      border-radius: 50%;
      i{
        padding: 0;
      }
      a{
        color: #fff;
      }
    }
}
</style>
