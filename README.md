## Demo page
https://mikhailk89.github.io/vue-crm-demo/

## Installation
Install `node_modules`: `npm install`

Start dev server: `npm run serve`

Build project: `npm run build`

For security reasons the following files have been hidden: `.env` and `src/config/firebase.config.js`

The file `.env` has the following structure:
```
VUE_APP_FIXER=
VUE_APP_TITLE=Mikhail CRM
```

The system variable `VUE_APP_FIXER` is used as a key to get currency rates through Fixer API:
```javascript
async fetchCurrency() {
  const key = process.env.VUE_APP_FIXER
  const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
  return await res.json()
}
```

The next file `src/config/firebase.config.js` has the following structure:
```javascript
export default {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}
```

This config can be obtained when creating Firebase Database. Read more [here](https://firebase.google.com/docs/web/setup).

## Docs
Vue CLI: https://cli.vuejs.org/guide/

Firebase: https://firebase.google.com/docs/web/setup

Chart.js: https://www.chartjs.org/docs/latest/

Fixer API: https://fixer.io/documentation
