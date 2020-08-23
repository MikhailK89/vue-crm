<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{localizeStr('Login_App_Name')}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
        >{{localizeStr('Email_Not_Empty')}}</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >{{localizeStr('Email_Correct')}}</small>
      </div>

      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{localizeStr('Password')}}</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >{{localizeStr('Enter_Password')}}</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{localizeStr('Password_Should_Be')}} {{$v.password.$params.minLength.min}} {{localizeStr('Password_Length')}} {{password.length}}</small>
      </div>

      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">{{localizeStr('Name')}}</label>
        <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >{{localizeStr('Enter_Name')}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{localizeStr('Register_Agree')}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{localizeStr('Register')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{localizeStr('Have_Account')}}
        <router-link to="/login">{{localizeStr('Login')}}</router-link>
      </p>

      <div class="switch">
        <label>
          English
          <input
            type="checkbox"
            v-model="isRuLocale"
          >
          <span class="lever"></span>
          Русский
        </label>
      </div>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('Register_Title')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
    isRuLocale: true
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  mounted() {
    const locale = JSON.parse(localStorage.getItem('locale'))

    if (typeof locale === 'boolean') {
      this.isRuLocale = locale
    }
  },
  updated() {
    localStorage.setItem('locale', JSON.stringify(this.isRuLocale))
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    },
    localizeStr(str) {
      const locale = this.isRuLocale ? 'ru-RU' : 'en-US'
      return localizeFilter(str, locale)
    }
  }
}
</script>

<style scoped>
  .card-action .switch {
    margin-top: 20px;
    text-align: right;
  }
</style>
