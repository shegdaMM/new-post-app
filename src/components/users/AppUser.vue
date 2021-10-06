<template>
  <section class="user-wrapper">
    <section class="user-main">
      <div class="user-text" v-if="user.name">
        <span class="discriptoin">NAME:</span>
        <span class="user__name">
          <a style="text-decoration: none; cursor: pointer;" @click="linkToShowPost"> {{user.name}} </a>
        </span>
      </div>
      <div class="user-text" v-if="user.email">
        <span class="discriptoin">EMAIL:</span>
        <span class="user__email"><a :href="'mailto:' + user.email">{{user.email}}</a></span>
      </div>
      <div class="user-text" v-if="user.extra_details">
        <span class="discriptoin">DETAILS:</span>
        <span class="user__extra_details">{{user.extra_details}}</span>
      </div>
      <div class="user-text" v-if="user.dateCreated">
        <span class="discriptoin">ACCOUNT CREATED:</span>
        <span class="user__dateCreated">{{user.dateCreated}}</span>
      </div>
      <div class="user-text" v-if="isLoginUser">
        <span class="discriptoin">ID:</span>
        <span class="user__id" v-if="user._id">{{user._id}}</span>
      </div>
    </section>
    <section class="user-proffecion">
      <div class="user-text" v-if="user.profession">
        <span class="discriptoin">PROFESSION:</span>
        <span class="user__profession">{{user.profession}}</span>
      </div>
      <div class="user-text" v-if="user.skills">
        <span class="discriptoin">SKILLS</span>
        <span class="user__skills">{{user.skills}}</span>
      </div>
      <div class="user-text" v-if="user.details">
        <span class="discriptoin">DETAILS: </span>
        <span class="user__details">{{user.details}}</span>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'vUser',
  props: {
    user: {
      type: Object,
      required: true
    },
    ID: String
  },
  computed: {
    isLoginUser () {
      return this.$store.getters.loggedInUser?._id === this.ID;
    }
  },
  methods: {
    linkToShowPost () {
      this.$router.push({ name: 'UserById', params: { uid: this.user._id } });
    }
  }
};
</script>

<style lang="scss" scoped>
  hr{
    display: none;
  }
  .user-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0.2rem auto;
     flex-wrap: wrap;
    padding: 1rem 1rem;
    border-radius: 1rem;
    flex-basis: 69%;
    width: 100%;
  }
  .user-wrapper > * {
    max-width: 480px;
    flex-grow: 1;
    flex-shrink: 1;
    margin: 1rem 0.5rem 0.5rem;

  }
  .user-text {
    margin-bottom: 0.5rem;
    display: flex;
  }
  .user-text span {
    word-break: break-word;
  }
  .discriptoin {
    font-family: 'Bebas Neue', cursive;
    display: inline-block;
    min-width: 6.5rem;
  }

  @media (max-width: 1020px) {

    hr{
      display: block;
    }
  }
</style>
