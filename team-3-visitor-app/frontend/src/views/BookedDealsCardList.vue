<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
  <b-list-group class="card-list flex-wrap" horizontal>
    <BookedTicketCard
      class=".ml-3"
      v-for="booking in bookings"
      :key="booking._id"
      :booking="booking"
    ></BookedTicketCard>
  </b-list-group>
</template>

<script>
import BookedTicketCard from '../components/BookedTicketCard'
import { Api } from '@/Api'

export default {
    name: 'BookingsDeals',
    data() {
        return {
            bookings: []
        }
    },
    mounted() {
        this.getBookings()
    },
    methods: {
        getBookings() {
            Api.get('dealBookings/')
                .then((response) => {
                    this.bookings = response.data.bookings
                    console.log('TEXT', response)
                })
                .catch((error) => {
                    this.bookings = []
                    console.log(error)
                })
                .then(() => {
                    // This code is always executed (after success or error).
                })
        }
    },
    components: {
        BookedTicketCard
    }
}
</script>

<style scoped>
a {
  color: #42b983;
}

.card-list {
  display: flex;
  justify-content: center;
  margin: 0;
  padding-bottom: 2rem;
  overflow-y: auto;
  width: 100%;
}
</style>
