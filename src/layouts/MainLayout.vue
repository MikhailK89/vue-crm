<template>
  <div>
    <Loader v-if="loading" />

    <div v-else class="app-main-layout">

      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          data-btn="add"
          to="/record"
          v-tooltip="localizeStr('MainLayout_Create_Record')"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import Loader from '@/components/app/Loader'
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(localizeFilter(messages[fbError.code]) || localizeFilter('Message_Something_Wrong'))
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    const isRuLocale = this.$store.getters.info.locale === 'ru-RU'
    localStorage.setItem('locale', JSON.stringify(isRuLocale))

    this.loading = false
  },
  methods: {
    localizeStr(str) {
      return localizeFilter(str)
    }
  },
  components: {
    Navbar, Sidebar, Loader
  }
}
</script>
