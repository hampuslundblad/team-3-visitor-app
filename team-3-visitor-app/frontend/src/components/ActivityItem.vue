<style src="../styles/VisitorApp.scss" lang="scss"></style>
<template>
<div>
  <div @close="onClose" class="modalStyle" id="bookingModal">
      <Booking :activity="activity" />
  </div>
  <div class="m-5 rounded white">
    <div id="about"></div>
    <div class="container pt-4 rounded">
      <div class="row">
        <div class="col-sm-4">
          <div>
            <img
              src="http://cdn.cnn.com/cnnnext/dam/assets/190705153928-millennium-force-rollercoaster-004.jpg"
            />
          </div>
          <h3 class="pinkText">INFORMATION</h3>
          <ul class="list-unstyled">
            <li>Located at: {{ activity.location }}</li>
            <div v-if="activity.type === 'Ride'">
              <li>Ticket price: {{ activity.price }}</li>
              <li>Type: {{activity.subtype}} ride</li>
            </div>
            <li v-if="activity.averageTime">Avg. wait time: {{ activity.averageTime }} mins</li>
            <li>
              <button v-if="activity.open === true" class="button" type="button" v-on:click="clickBook()">
                Reserve a seat!
              </button>
              <button v-else class="button disabledButton" type="button" disabled>
                Closed
              </button>
            </li>
          </ul>

        </div>
        <div class="col-sm-8">
          <h2 class="description-text pinkText">DESCRIPTION</h2>
          <p>{{ activity.description }}</p>
        </div>
      </div>
       <hr class="divider" />
      <BusyHoursComponent/>
    </div>
  </div>
</div>
</template>

<script>
import Booking from './Booking.vue'
import BusyHoursComponent from './BusyHoursComponent.vue'

export default {
    name: 'activity-item',
    components: {
        Booking,
        BusyHoursComponent
    },
    props: ['activity'],
    methods: {
        clickBook: function () {
            console.log('Hi: ')
            console.log(this.activity.type)
            var modal = document.getElementById('bookingModal')
            modal.style.display = 'block'
        },
        onClose: function () {
            var modal = document.getElementById('bookingModal')
            modal.style.display = 'none'
        }
    }
}
</script>

<style scoped>
img {
  width: 100%;
}
.container {
  margin-top: 20px;
  text-align: center;
}
.divider{
  margin-top:3rem;
  margin-bottom:5rem;
}
.white {
  background-color: white;
}

/* Style for booking modal */
.modalStyle {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  text-align: center;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

</style>
