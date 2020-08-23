<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'HomeBill_Exchange_Rates' | localize}}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{'HomeCurrency_Currency' | localize}}</th>
            <th>{{'HomeCurrency_Rate' | localize}}</th>
            <th>{{'Date' | localize}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur of currencies" :key="cur">
            <td>{{cur}}</td>
            <td>{{rates[cur]}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-currency',
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  })
}
</script>
