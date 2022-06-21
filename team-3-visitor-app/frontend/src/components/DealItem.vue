<style src="../styles/VisitorApp.scss" lang="scss"></style>
<template>
  <div>
    <div @close="onClose" class="modalStyle" id="bookingModal">
      <DealsBooking :deal="deal" />
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
              <!-- <li>Location: {{ deal.location }}</li> -->
              <li>Price: {{ deal.price }}</li>
              <li>
                <button class="button" type="button" v-on:click="clickBook()">
                  Buy this deal!
                </button>
              </li>
            </ul>
            <hr class="hidden-sm hidden-md hidden-lg" />
          </div>
          <div class="col-sm-8">
            <h2 class="description-text pinkText">DESCRIPTION</h2>
            <p v-html="deal.descriptionLong"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DealsBooking from './DealsBooking.vue'

export default {
    name: 'deal-item',
    components: { DealsBooking },
    props: ['deal'],
    methods: {
        clickBook: function () {
            console.log('Hi: ')
            console.log(this.deal.type)
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
