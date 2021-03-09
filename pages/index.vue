<template>
  <v-container>
    <v-form @submit.prevent="addData">
      <v-text-field v-model="txt" label="Text" class="ma-2"></v-text-field>
      <v-item-group class="d-inline-flex">
        <v-checkbox
          v-model="checkbox"
          v-for="n in 3"
          :key="n"
          :label="`Checkbox ${n}`"
          :value="n"
          class="mr-5"
        ></v-checkbox>
      </v-item-group>
      <v-radio-group v-model="radioGroup" row>
        <v-radio
          v-for="n in 3"
          :key="n"
          :label="`Radio ${n}`"
          :value="n"
        ></v-radio>
      </v-radio-group>
      <v-switch v-model="switcher" label="Switch On/Off" inset></v-switch>
      <v-rating v-model="rating" label="Rating"></v-rating>
      <v-slider v-model="slider" min="0" max="100" label="Slider"></v-slider>
      <v-btn color="success" class="mr-4" @click="addData">Submit</v-btn>
      <v-btn color="warning" class="mr-4" @click="checkUser"> Reset Form </v-btn>
      <CollectionText />
    </v-form>
  </v-container>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
import firebase from 'firebase/app'
import CollectionText from '~/components/CollectionText.vue'

export default {
  components: {
    CollectionText,
  },

  data: function () {
    return {
      txt: '',
      checkbox: [],
      radioGroup: null,
      switcher: false,
      rating: 3,
      slider: 20,
    }
  },
  methods: {
    addData() {
      // เก็บข้อมูล Form ใน collection MyForm ( มี 1 document แต่จะ u    pdate ข้อมูลเรื่อย ๆ )
      var data = {
        txt: this.txt,
        checkbox: this.checkbox,
        radioGroup: this.radioGroup,
        switcher: this.switcher,
        rating: this.rating,
        slider: this.slider,
      }

      db.collection('MyForm')
        .doc('formdata')
        .set(data)
        .then(function () {
          console.log('Document successfully written! -> MyForm')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })

      // เก็บข้อมูล Input Text ใน collection MyText (มีหลาย document ข้อมูลจะเพิ่มขึ้นเรื่อย ๆ )
      var dataText = {
        txt: this.txt,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }
      db.collection('MyText')
        .doc()
        .set(dataText)
        .then(function () {
          console.log('Document successfully written! -> MyText')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },checkUser(){
      var user = firebase.auth().currentUser;
      console.log(user===null)
    },
    created() {
      this.getData()
    },
    getData() {
      db.collection('MyForm')
        .doc('formdata')
        .onSnapshot((doc) => {
          //console.log("Current data: ", doc.data());
          var firebaseData = doc.data()
          if (firebaseData) {
            this.txt = firebaseData.txt
            this.checkbox = firebaseData.checkbox
            this.radioGroup = firebaseData.radioGroup
            this.switcher = firebaseData.switcher
            this.rating = firebaseData.rating
            this.slider = firebaseData.slider
          }
        })
    },
    reset() {},
  },
}
</script>

<style></style>
