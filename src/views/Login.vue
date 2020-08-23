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
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{localizeStr('Login')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{localizeStr('No_Account')}}
        <router-link to="/register">{{localizeStr('Register')}}</router-link>
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
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'login',
  metaInfo() {
    return {
      title: this.$title('Login_Title')
    }
  },
  data: () => ({
    email: '',
    password: '',
    isRuLocale: true
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    const locale = JSON.parse(localStorage.getItem('locale'))

    if (typeof locale === 'boolean') {
      this.isRuLocale = locale
    }

    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]))
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
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
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
