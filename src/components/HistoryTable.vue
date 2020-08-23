<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'Amount' | localize}}</th>
        <th>{{'Date' | localize}}</th>
        <th>{{'HistoryTable_Category' | localize}}</th>
        <th>{{'HistoryTable_Type' | localize}}</th>
        <th>{{'HistoryTable_Open' | localize}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ getCurrentPos(idx + 1) }}</td>
        <td>{{ record.amount | currency('RUB') }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span
            :class="[record.typeClass]"
            class="white-text badge"
          >{{ record.typeText }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            data-btn="open"
            @click="$router.push('/detail/' + record.id)"
            v-tooltip="localizeStr('HistoryTable_Show_Record')"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    records: {
      required: true,
      type: Array
    },
    pageSize: {
      required: true
    }
  },
  methods: {
    getCurrentPos(idx) {
      const currentPage = this.$route.query.page || 1
      return (currentPage - 1) * this.pageSize + idx
    },
    localizeStr(str) {
      return localizeFilter(str)
    }
  }
}
</script>
