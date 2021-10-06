<template>
<h1> Edit your account in the system </h1>
<div class="info">
  <div class="user-text" v-if="currentUser?.dateCreated">
    <span class="discriptoin">ACCOUNT CREATED:</span>
    <span class="user__dateCreated">{{currentUser.dateCreated}}</span>
  </div>
  <div class="user-text">
    <span class="discriptoin">ID:</span>
    <span class="user__id" v-if="currentUser?._id">{{currentUser._id}}</span>
  </div>
  <div class="user-text" v-if="currentUser?.email">
    <span class="discriptoin">EMAIL:</span>
    <span class="user__email"><a :href="'mailto:' + currentUser.email">{{currentUser.email}}</a></span>
  </div>
</div>
<!-- FOR create user -->
<div class="info" if="currentUser._id">

</div>
<q-form class="edit-form" @submit.prevent="save">
  <div class="user-info">
    <q-input filled v-model="user.name" type="text" class="form-input" label="Name:" @click="changeState=true">
    </q-input>
    <q-input filled v-model="user.extra_details" class="form-input" type="textarea" label="Details:" @click="changeState=true">
    </q-input>
  </div>
  <div class="user-profession">
    <q-input filled v-model="user.profession" type="text" class="form-input" label="Profession:" @click="changeState=true">
    </q-input>
    <q-input filled v-model="user.skills" class="form-input" type="textarea" label="Skills:" @click="changeState=true">
    </q-input>
  </div>
  <div class="details">
     <q-input filled v-model="user.details" class="form-input" type="textarea" label="Details:" @click="changeState=true">
    </q-input>
  </div>
  <q-btn color="white" glossy label="SAVE" @click.prevent="save"/>
</q-form>
</template>

<script>
// :disabled="checkState"
// :class="{'blocked' : checkState}"
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditAccount',
  props: {
    uid: {
      type: String,
      required: true
    }
  },
  data () {
      return {
        changeState: false,
        user: {
            _id: '',
            email: '',
            name: '',
            avatar: '',
            extra_details: '',
            skills: '',
            profession: '',
            details: '',
            dateCreated: '',
            __v: ''
        }
      };
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['getUserById', 'patchCurrentUser']),
    async save () {
      console.log(this.changeState);
      if (this.changeState) {
        await this.patchCurrentUser(this.user);
        this.$router.push({ path: `/user/${this.user._id}` });
      }
    }
  },
  async mounted () {
    if (this.uid) {
      await this.getUserById({ id: this.uid });
      this.user = this.currentUser;
    }
  },
  created () {
     if (this.$store.getters.loggedInUser?._id !== this.uid) {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin: 0.2rem auto;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    flex-wrap: wrap;
}
.info > * {
    flex-grow: 1;
    flex-shrink: 1;
    margin: 0.25rem 0.4rem 0.1rem;
    padding: 0.2rem 0.7rem 0.1rem;
    border: #00af89 solid 0.1rem;
    border-radius: 1rem;
}
.user-text {
    margin-bottom: 0.5rem;
    display: flex;
  }
.discriptoin {
    font-family: 'Bebas Neue', cursive;
    display: inline-block;
    min-width: 6.5rem;
}
// form
.edit-form{
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  .p-float-label{
      width: 100%;
  }
  .form-input {
      width: 100%;
      margin-bottom: 0.5rem;
  }
}

.user-info, .user-profession, details, button{
  margin: 0.2rem 0.5rem;
  flex-basis: 48%;
  flex-grow: 1;
  flex-shrink: 1;
}
.details {
  flex-basis: 100%;
  padding: 0 0.45rem;
}

.edit-form .p-field-last {
  margin-bottom: 0.8rem;
}
.blocked {
  filter: sepia(50%);
}
</style>
