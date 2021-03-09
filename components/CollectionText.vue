<template>
<v-card class="mt-5">
    <v-card v-for="(item,key) in textList" :key=key class="pa-2" outlined tile>
        {{item.txt}}
    </v-card>
</v-card>
</template>

<script>
import {
    db
} from '~/plugins/firebaseConfig.js'
export default {
    data: function () {
        return {
            textList: [],
        }
    },
    methods: {
        getData() {
            db.collection("MyText").orderBy("timestamp").onSnapshot((querySnapshot) => {
                var data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                this.textList = data
            })
        }
    },
    created() {
        this.getData()
    },
}
</script>

<style>
</style>