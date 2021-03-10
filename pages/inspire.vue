<template>
  <div class="login100">
    <v-card class="wrap-login100" color="rgba(255, 255, 255, 0.75)">
      <v-row class="center"
        ><v-col cols="6">
          <v-img src="https://illustoon.com/photo/1774.png"></v-img
        ></v-col>
        <v-col cols="6">
          <v-container>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-btn @click="admin"> admin click here </v-btn>
                  <h1 class="logtitle">Sign in to work</h1>
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                    filled
                    rounded
                    dense
                    solo-inverted
                  ></v-text-field
                ></v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Password"
                    class="input-group--focused"
                    filled
                    rounded
                    dense
                    solo-inverted
                    @click:append="show2 = !show2"
                  ></v-text-field></v-col
              ></v-row>
              <v-hover>
                <v-btn
                  rounded
                  class="container-btn"
                  color="#DCB13C"
                  @click="login()"
                >
                  SIGN IN
                </v-btn></v-hover
              >
              <v-btn color="info" class="mr-4" @click="checkUser">
                Check
              </v-btn>
              <v-btn color="red" class="mr-4" @click="logout"> logout </v-btn>
              <!-- <v-btn color="error" class="mr-4" @click="logout"> logout </v-btn>    -->
            </v-form>
          </v-container>
        </v-col> </v-row
      >d
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  layout: 'login',
  layout: 'loginGoogle',
  data() {
    return {
      show2: false,
      email: '',
      password: '',
      clock: {
        el: '#clock',
        data: {
          time: '',
          date: '',
        },
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    admin() {
      this.$router.replace('/inadmin')
    },
    loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          // The signed-in user info.
          const user = result.user
          // ...
          console.log('token : ' + token)
          console.log('user : ' + user)
        })

        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential
          // ...
          console.log('errorCode= ' + errorCode)
          console.log('errorMessage= ' + errorMessage)
          console.log('email= ' + email)
          console.log('credential' + credential)
        })
    },
    checkUser() {
      var user = firebase.auth().currentUser
      console.log(user === null)
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          console.log('Sign-out successful')
        })
        .catch((error) => {
          // An error happened.
          console.log(error)
        })
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential
          // The signed-in user info.
          const user = result.user
          console.log('token : ' + token)
          console.log('user : ' + user)
          alert('login successful!')
          this.$router.replace('/')
        })

        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          console.log('ErrorCode' + errorCode)
          alert('Email or Password uncorrect!')
          console.log('ErrorCode' + errorMessage)
          // ...
        })
      // ถ้า sing in ได้แทนที่ด้วย ถ้าเป็น function โปรแกรมจะไม่ยอมรู้จัก this  ต้อง =>
    },
  },
}
</script>
<style>
.container-btn {
  width: 100%;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
}
.logtitle {
  color: #333333;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 54px;
}
.wrap-login100 {
  width: 960px;
  border-radius: 20px;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 50px 50px 50px 95px;
}
.login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: -webkit-linear-gradient(-135deg, #c48313, #01bcc6);
  background: -o-linear-gradient(-135deg, #ac7311, #965334);
  background: -moz-linear-gradient(-135deg, #080808, #008eab);
  background: linear-gradient(-135deg, #000000, #008eab);
}
</style>
