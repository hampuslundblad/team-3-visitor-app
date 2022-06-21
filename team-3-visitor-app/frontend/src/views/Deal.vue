<style src="../styles/VisitorApp.scss" lang="scss"></style>
<template>
  <div class="activities green flex-wrap" :style="{ 'min-height': 600 + 'px' }">
    <nav class="breadcrumb">
      <p><a href="http://localhost:8080">Home</a>&nbsp; / &ensp;<a href="http://localhost:8080/deals">Deals</a>&nbsp; / &nbsp;{{deal.name}}</p>
    </nav>
    <h1 class="header">{{ deal.name }}</h1>
    <DealItem :deal="deal"></DealItem>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import DealItem from '../components/DealItem.vue'

export default {
    name: 'Deals',
    data() {
        return {
            deal: {},
            windowHeight: window.innerHeight
        }
    },
    created() {
        window.addEventListener('resize', this.myEventHandler)
    },
    mounted() {
    // console.log(this.$route.params.id)
    // put correct id here when the clickable items are ready
        this.getDeal(this.$route.params.id)
        window.onresize = () => {
            this.windowHeight = window.innerHeight
        }
    },
    methods: {
    // Might need to be ${id} in final version
        getDeal(id) {
            Api.get('/deals/' + id)
                .then((response) => {
                    this.deal = response.data
                    // console.log(this.activities)
                })
                .catch((error) => {
                    this.deal = error
                    console.log('error' + error).then(() => {
                        // This code is always executed (after success or error).
                    })
                })
        },
        myEventHandler(e) {
            this.windowHeight = window.innerHeight
        }
    },
    components: {
        DealItem
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.camels {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}

.header {
  padding: 20px;
  text-transform: uppercase;
  color: #c45891;
  background-color: #ebf0df;
  text-align: center;
}
.green {
  background-color: #ebf0df;
}
</style>
