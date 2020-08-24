## Demo page
https://mikhailk89.github.io/vue-crm-demo/

## About project
It's the example of a simple CRM system for recording income and expenses by categories.

User authorization is implemented using Firebase and [vuelidate package](https://www.npmjs.com/package/vuelidate) for validating form fields.

User has the ability to add and modify data in the Firebase Database.

The server side is not implemented in this project. So database queries are on the client side. Such an implementation is not safe.

Fixer API allows you to make free requests only by http-protocol. So requests from https to http lead to cross-domain error. For this reason the Home page may not work.

The package [vue-chartjs](https://www.npmjs.com/package/vue-chartjs) is used for graphical data presentation.

The complete project guide in russian is in the file `/guide.txt`.

The initial static pages are in the folder `/src/templates`.

In this project alias `@` is used for more usable modules import. It leads to the primary folder `/src`.

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

vue-chartjs: https://vue-chartjs.org/guide/

Fixer API: https://fixer.io/documentation
