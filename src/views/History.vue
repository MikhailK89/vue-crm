<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      {{'History_Not_Found' | localize}}
      <router-link to="/record">{{'History_Add_First' | localize}}</router-link>
    </p>

    <section v-else>
      <HistoryTable
        :records="items"
        :pageSize="pageSize"
      />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'History_Back' | localize"
        :next-text="'History_Forward' | localize"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import {Pie} from 'vue-chartjs'
import {getChartColors} from '@/utils/chart.utils'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.page = +this.$route.query.page || 1

    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income'
            ? localizeFilter('Income')
            : localizeFilter('Outcome')
        }
      }))

      const getColors = getChartColors(categories)

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: localizeFilter('HistoryTable_Label'),
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: getColors('background'),
          borderColor: getColors('border'),
          borderWidth: 1
        }]
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>
