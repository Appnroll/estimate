# Estimate

> App for easier projects estimation.

## Pre-configuration

Create a _Cloud Firestore_ at [Google Firebase](https://firebase.google.com) and generate configuration code for web app.

Afterwards, create the `.env` file in main project's directory with following environmental variables:
```
FIREBASE_API_KEY
FIREBASE_MESSAGING_ID
FIREBASE_PROJECT_ID
```

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
