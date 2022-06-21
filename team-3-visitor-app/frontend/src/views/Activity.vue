<style src="../styles/VisitorApp.scss" lang="scss"></style>
<template>
  <div class="activities green flex-wrap" :style="{ 'min-height': 600 + 'px'}">
    <nav class="breadcrumb" v-if="activities.type === 'Ride'">
      <p><a href="http://localhost:8080">Home</a>&nbsp; / &ensp;<a href="http://localhost:8080/rides">Rides</a>&nbsp; / &nbsp;{{activities.name}}</p>
    </nav>
    <nav class="breadcrumb" v-if="activities.type === 'Game'">
      <p><a href="http://localhost:8080">Home</a>&nbsp; / &ensp;<a href="http://localhost:8080/games">Games</a>&nbsp; / &nbsp;{{activities.name}}</p>
    </nav>
    <nav class="breadcrumb" v-if="activities.type === 'Restaurant'">
      <p><a href="http://localhost:8080">Home</a>&nbsp; / &ensp;<a href="http://localhost:8080/restaurants">Restaurants</a>&nbsp; / &nbsp;{{activities.name}}</p>
    </nav>
    <h1 class="header">{{ activities.name }}</h1>
    <activity-item v-bind:activity="activities"></activity-item>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import ActivityItem from '../components/ActivityItem.vue'

export default {
    name: 'Activities',
    data() {
        return {
            activities: [],
            windowHeight: window.innerHeight
        }
    },
    created() {
        window.addEventListener('resize', this.myEventHandler)
    },
    mounted() {
    // console.log(this.$route.params.id)
    // put correct id here when the clickable items are ready
        this.getActivities(this.$route.params.id)
        window.onresize = () => {
            this.windowHeight = window.innerHeight
        }
    },
    methods: {
    // Might need to be ${id} in final version
        getActivities(id) {
            Api.get('/activities/' + id)
                .then((response) => {
                    this.activities = response.data
                    // console.log(this.activities)
                })
                .catch((error) => {
                    this.activities = error
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
        ActivityItem
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
  text-align:center;
}
.green {
  background-color: #ebf0df;
}
</style>
