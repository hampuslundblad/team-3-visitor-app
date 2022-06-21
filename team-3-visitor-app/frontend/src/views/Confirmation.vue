<style src="../styles/VisitorApp.scss" lang="scss"></style>
<template>
<div class="green">
    <nav class="breadcrumb">
      <p><a href="http://localhost:8080">Home</a>&nbsp; / &ensp;<a :href="'http://localhost:8080/' + this.activity.type +'s'">{{this.activity.type}}s</a>&nbsp; / &nbsp;<a :href="'http://localhost:8080/activity/' + this.booking.activityId">{{this.activity.name}}</a>&nbsp; / &nbsp; Booking Confirmation (ID: {{this.booking._id}})</p>
    </nav>
    <div class='confirmation'>
        <h3>Booking ID: {{this.booking._id}}</h3>
        <p>Activity ID: {{this.booking.activityId}}</p>
        <p>Activity: {{this.activity.name}}</p>
        <p v-if="this.activity.type === 'Ride'">Price per Ticket: {{this.booking.pricePerTicket}}</p>
        <p v-if="this.activity.type === 'Ride'">Total Price: {{this.booking.totalPrice}}</p>

        <p>Timeslot: {{this.booking.timeslot}} </p>
        <p v-if="this.activity.type === 'Ride'">Amount of Tickets: {{this.booking.ticketAmount}}</p>
        <p v-else>Number of People: {{this.booking.ticketAmount}}</p>

        <p>Booking Time: {{new Date(this.booking.bookingTime * 1000).toLocaleString()}}</p>
    </div>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
    name: 'confirmation',
    data() {
        return {
            booking: {},
            activity: {}
        }
    },
    mounted() {
        this.getBooking()
    },
    methods: {
        /* Get the corresponding booking */
        getBooking() {
            Api.get('bookings/' + this.$route.params.id)
                .then(response => {
                    this.booking = response.data.bookings
                    this.getActivity()
                })
                .catch(error => {
                    this.booking = []
                    console.log(error)
                })
                .then(() => {
                    // This code is always executed (after success or error).
                })
        },
        /* Get the activity in the booking */
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
a {
  color: #42b983;
}
.confirmation {
    background-color: whitesmoke;
    width: 50%;
    padding: 20px;
    border-radius: 10px;
    margin: 5% auto 5% auto;
}
.green {
  background-color: #ebf0df;
  height: 100vh
}
</style>
