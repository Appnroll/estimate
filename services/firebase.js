import * as firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.FIREBASE_API_KEY}.firebaseapp.com`,
    databaseURL: `https://${process.env.FIREBASE_API_KEY}.firebaseio.com`,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_ID
  })
}

const db = firebase.firestore()
db.settings({})

const projectsRef = db.collection('projects')

export default {
  projectsRef
}

