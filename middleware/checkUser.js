import firebase from 'firebase/app'

export default function ({ req, redirect, route }) {
    var user = firebase.auth().currentUser;
    if (!route.path.includes('inspire')) { // if path doesn't include "dashboard", stop there
    if (user) {
        // User is signed in.
        console.log("Login")
      } else {
        // No user is signed in.
        console.log("Not Login")
        redirect('inspire')
      }
    }
  }

    
  
  