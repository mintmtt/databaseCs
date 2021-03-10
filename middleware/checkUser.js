import firebase from 'firebase/app'

export default function ({
  req,
  redirect,
  route
}) {
  var user = firebase.auth().currentUser;
  if (!route.path.includes('inspire')) { //เช็คว่าไม่ใช่inspire ใช่มั้ย if path doesn't include "dashboard", stop there 
    if (user) {
      // User is signed in.
      console.log(user.email)
    } else {
      // No user is signed in.
      console.log("Not Login")
      // this.$router.replace('/admin')
      // redirect('inspire')
    }
  }
  // if (!route.path.includes('inspire')) {
  //   if (user) {
  //     console.log(user.email == "admin123@gmail.com")
  //     this.$router.replace('/admin')
  //   } else {
  //     // No user is signed in.
  //     console.log("Not Login")
  //     // this.$router.replace('/admin')
  //     redirect('inspire')
  //   }
  }

