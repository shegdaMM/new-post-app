<template>
<app-title-page>
  Create new account in system
</app-title-page>
<q-form class="edit-form">
<div class="user-info">
  <q-input class="form-input" filled v-model="user.email" type="email" label="email" hint="Enter valid email"
      :rules="[val => !!val || 'Email is missing', isValidEmail]" ref="email"
    >
      <template v-slot:prepend>
        <q-icon name="fas fa-envelope" />
      </template>
    </q-input>
</div>
<div class="user-info">
    <q-input class="form-input" v-model="user.password" filled :type="isPwd ? 'password' : 'text'" label="password"
          ref="password"  :rules="[val => (val && val.length > 5) || 'Password must be longer than 6 characters']"
    >
      <template v-slot:prepend>
        <q-icon name="fas fa-key" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'fas fa-eye' : 'fas fa-eye-slash'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
</div>
<div class="user-info">
    <q-input filled v-model="user.name" type="text" class="form-input"
    label="Name:" @click="changeState=true"
    :rules="[val => (val && val.length >= 3) || 'Name mast have minimal 3 symbols']">
    </q-input>

    <q-input filled v-model="user.extra_details" class="form-input" type="textarea" label="Details:">
    </q-input>
  </div>
  <div class="user-profession">
    <q-input filled v-model="user.profession" type="text" class="form-input" label="Profession:" >
    </q-input>
    <q-input filled v-model="user.skills" class="form-input" type="textarea" label="Skills:">
    </q-input>
  </div>
  <div class="details">
     <q-input filled v-model="user.details" class="form-input" type="textarea" label="Details:" >
    </q-input>
  </div>
  <q-btn @click.stop="createUser" v-if="user.email && user.name && user.password" color="white" glossy label="CREATE ACCOUNT" />
</q-form>
</template>

<script>
// :disabled="checkState"
// :class="{'blocked' : checkState}"
import { mapActions } from 'vuex';
import AppTitlePage from '../../components/ui/AppTitlePage.vue';

export default {
  components: { AppTitlePage },
  name: 'EditAccount',
  props: {
  },
  data () {
      return {
        errorname: null,
        changeState: false,
        user: {
            password: '',
            email: '',
            name: '',
            extra_details: '',
            skills: '',
            profession: '',
            details: ''
        },
        isPwd: false
      };
  },
  watch: {
    user () {
      this.changeState = true;
    }
  },
  methods: {
    ...mapActions(['createCurentUser']),
    async createUser () {
      await this.createCurentUser(this.user);
    },
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    }
  },
  mounted () {
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

  button {
      background:    #ffffff;
      border:        3px solid #00ffff;
      border-radius: 10px;
      padding:       0.3rem 1.5rem;
      color:         #00af89;
      display:       block;
      font-size:     1.2rem;
      text-align:    center;
      width: 100%;
      max-width: 350px;
  }
  .p-float-label{
      width: 100%;
  }
  .form-input {
      width: 100%;
      margin-bottom: 0.5rem;
  }
  .p-field {
      margin-bottom: 1.8rem;
  }
  label {
    font-size: 1.2rem;
  }
}

.user-info, .user-profession, details, button{
  margin: 0.7rem 0.5rem;
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
