<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Account' | localize}}</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        data-btn="refresh"
        @click="refresh"
        v-tooltip="localizeStr('Home_Refresh')"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">

      <HomeBill
        :rates="currency.rates"
      />

      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />

    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'home',
  metaInfo() {
    return {
      title: this.$title('Menu_Account')
    }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
    localizeStr(str) {
      return localizeFilter(str)
    }
  },
  components: {
    HomeBill, HomeCurrency
  }
}
</script>
