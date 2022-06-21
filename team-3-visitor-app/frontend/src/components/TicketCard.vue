<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
  <b-list-group-item class="card pinkText box">
    <img alt="Attraction" :src=activity.cardImage>
    <div class="text-container">
      <h2 class="pinkText">{{this.activity.name}}</h2>
      <p class="bold">Timeslot:</p><p>{{booking.timeslot}}</p>
      <p class="bold">Nr. of tickets:</p><p>{{booking.ticketAmount}}</p>
    </div>
  </b-list-group-item>
</template>

<script>
import { Api } from '@/Api'

export default {
    name: 'Booking-Item',
    props: ['booking'],
    data() {
        return {
            activity: {}
        }
    },
    mounted() {
        this.getActivity()
    },
    methods: {
        getActivity() {
            Api.get('activities/' + this.booking.activityId)
                .then(response => {
                    this.activity = response.data
                })
                .catch(error => {
                    this.booking = []
                    console.log(error)
                })
                .then(() => {
                    // This code is always executed (after success or error).
                })
        }
    }
}
</script>

<style scoped>
.bold {
  float:left;
  font-weight:bold;
  margin-right:0.1rem;
}

p {
  font-size:12px;
  text-align:left;
  margin-bottom:0px;
}

a {
  margin:10px;
}

img {
  width: 100%;
}

.cardLink {
  height: 250px;
}

h2 {
 text-align: center;
 font-size:16px;
 font-weight:bold;
 border-bottom:1px solid ;
}

.card {
  transition: transform .2s; /* Animation */
  background: white;
  width:12rem;
  min-width:12rem;
  height:16rem;
  min-height:16rem;
  margin: 20px;
}

.text-container {
  margin-top:1rem;
}

.box {
  -webkit-box-shadow: 0 10px 6px -6px #777;
     -moz-box-shadow: 0 10px 6px -6px #777;
          box-shadow: 0 10px 6px -6px #777;
  ;
}
</style>
