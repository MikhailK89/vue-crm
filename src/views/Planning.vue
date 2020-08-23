<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{'Category_Not_Found' | localize}}.
      <router-link to='/categories'>
        {{'Category_Add' | localize}}.
      </router-link>
    </p>

    <section v-else>
      <div v-for="c of categories" :key="c.id">
        <p>
          <strong>{{c.title}}:</strong>
          {{c.spend | currency('RUB')}} {{'Planning_Out_Of' | localize}} {{c.limit | currency('RUB')}}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
              class="determinate"
              :class="[c.progressColor]"
              :style="{width: c.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(rec => rec.categoryId === cat.id)
        .filter(rec => rec.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const percent = spend / cat.limit * 100
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
