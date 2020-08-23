<template>
  <div>
    <Loader v-if="loading" />

    <p v-else-if="!record" class="center">
      {{'Detail_Warning' | localize}}
    </p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'Detail_History' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? localizeStr('Income') : localizeStr('Outcome')}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'green': record.type === 'income',
            'red': record.type === 'outcome'
          }">
            <div class="card-content white-text">
              <p>{{'Detail_Description' | localize}}: {{record.description}}</p>
              <p>{{'Amount' | localize}}: {{record.amount | currency('RUB')}}</p>
              <p>{{'Detail_Category' | localize}}: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'detail',
  metaInfo() {
    return {
      title: this.$title('Detail_Title')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  },
  methods: {
    localizeStr(str) {
      return localizeFilter(str)
    }
  }
}
</script>
