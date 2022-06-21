<style src="../styles/VisitorApp.scss" lang="scss"></style>
<template>
  <div class="green">
    <nav class="breadcrumb">
      <p><a href="http://localhost:8080">Home</a>&nbsp; / &ensp;<a href="http://localhost:8080/deals">Deals</a>&nbsp; / &nbsp;<a :href="'http://localhost:8080/deals/' + this.booking.dealId">{{ this.deal.name }}</a>&nbsp; / &nbsp; Booking Confirmation (ID: {{this.booking._id}})</p>
    </nav>
    <div class="confirmation">
      <h3>Booking ID: {{ this.booking._id }}</h3>
      <p>Deal ID: {{ this.booking.dealId }}</p>
      <p>Deal: {{ this.deal.name }}</p>
      <p v-if="this.deal.type === 'Deal'">
        Total Price: {{ this.booking.totalPrice }}
      </p>
      <p v-if="this.deal.type === 'Deal'">
        Amount of Tickets: {{ this.booking.ticketAmount }}
      </p>
      <p v-else>Number of People: {{ this.booking.ticketAmount }}</p>

      <p>
        Booking Time:
        {{ new Date(this.booking.bookingTime * 1000).toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
    name: 'confirmationDeal',
    data() {
        return {
            booking: {},
            deal: {}
        }
    },
    mounted() {
        this.getBooking()
    },
    methods: {
    /* Get the corresponding booking */
        getBooking() {
            Api.get('dealBookings/' + this.$route.params.id)
                .then((response) => {
                    this.booking = response.data.bookings
                    this.getDeal()
                })
                .catch((error) => {
                    this.booking = []
                    console.log(error)
                })
                .then(() => {
                    // This code is always executed (after success or error).
                })
        },
        /* Get the deal in the booking */
        getDeal() {
            Api.get('deals/' + this.booking.dealId)
                .then((response) => {
                    this.deal = response.data
                })
                .catch((error) => {
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
  height: 100vh;
}
</style>
