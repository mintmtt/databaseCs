import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDjEIX9XcNwMHRYZAcyEb7QGNGIWqeoFEc",
    authDomain: "database-cs-5c678.firebaseapp.com",
    projectId: "database-cs-5c678",
    storageBucket: "database-cs-5c678.appspot.com",
    messagingSenderId: "39871381734",
    appId: "1:39871381734:web:9bdf491b829175f3687b27",
    measurementId: "G-1NNDEQZ134"
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const auth = firebase.auth()
