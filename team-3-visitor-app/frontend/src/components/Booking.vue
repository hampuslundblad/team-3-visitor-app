<template>
<div class="modalContainer">
<div class="bookingModal">
     <span class="close" v-on:click="closeModal">&times;</span>
<div>
  <h3 class='pinkText'>Name: {{activity.name}}</h3>
  <p v-if="activity.type === 'Ride'">Ticket price: {{activity.price}}</p>
</div>

<span>Select timeslot</span>
<div id="timeslotTable">
  <span id="timeslotTableDate">{{ getCurrentDate() }}</span>

  <div class="timeslotTableRowHeader">
    <div class="timeslotTableColumnHeader" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span>TIME</span>
    </div>
    <div class="timeslotTableColumnHeader" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span>AVAILABLE SPOTS</span>
    </div>
    <div class="timeslotTableColumnHeader" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span>AVAILABILITY</span>
    </div>
    <div class="timeslotTableColumnHeader" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span>WAITING TIME</span>
    </div>
    <div class="timeslotTableColumnHeader" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span v-if="activity.type != 'Restaurant'">PRICE</span>
    </div>
    <div class="timeslotTableColumnHeader" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span></span>
    </div>
  </div>

  <div class="" v-for="booking in activity.bookingTimes" :value="booking.time" :key="booking.time" :style=" (getAvailability(booking) === 'passed' || getAvailability(booking) === 'unavailable') ? 'background: rgb(190, 190, 190); filter: grayscale(100%);' : 'background: rgb(226, 255, 227);' ">

    <div class="timeslotTableRow">
    <div class="timeslotTableColumn" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span>{{booking.time}}</span>
    </div>
    <div class="timeslotTableColumn" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span>{{booking.availableSpots}} left</span>
    </div>
    <div class="timeslotTableColumn" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span>{{ getAvailability(booking) }}</span>
    </div>
    <div class="timeslotTableColumn" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span>{{booking.waitTime}} mins</span>
    </div>
    <div class="timeslotTableColumn" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <span v-if="activity.type != 'Restaurant'">{{activity.price}} SEK</span>
    </div>
    <div class="timeslotTableColumn" :style=" (activity.type === 'Restaurant') ? 'width: 20%;' : 'width: 16.66%;' ">
        <input type="radio" v-model="selectedTimeslot" :value="booking.time" :key="booking.time" :disabled="(getAvailability(booking) === 'passed' || getAvailability(booking) === 'unavailable')">
    </div>
    </div>
  </div>
</div>

<span id="selectedTimeslotMessage" v-if="selectedTimeslot != ''">You have selected the timeslot: <span id="selectedTimeslot">{{selectedTimeslot}}</span></span>

<div class='bookingBoxContainer'>
  <span v-if="activity.type === 'Ride'">Select number of tickets</span>
  <span v-else>Select number of people</span>
  <div>
    <select v-model="selectedNoTickets">
      <option disabled value="">Please select number</option>

      <!-- Change so that we get the max no. of tickets from the backend??? -->
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
    </select>
  </div>
</div>

<div class='bookingBoxContainer' v-if="activity.type === 'Ride'">
  <h3 class='pinkText'>Total Price: {{ activity.price*selectedNoTickets }}</h3>
</div>

<div v-if="activity.type === 'Ride'" class='payment'>
    <div class='paymentCard'>
        <span>Card number: </span>
        <div>
            <input class='paymentCardInput' type="text" v-model="cardNumber" :maxlength=16 @keypress="onlyNumber" placeholder="Card number" />
        </div>
    </div>
    <div class='paymentExp'>
        <span>Expiration date: </span>
        <div>
            <input class='paymentExpInput' type="text" v-model="expMonth" :maxlength=2 @keypress="onlyNumber" placeholder="MM" />
            <input class='paymentExpInput' type="text" v-model="expYear" :maxlength=2 @keypress="onlyNumber" placeholder="YY" />
        </div>
    </div>
    <div class='paymentCCV'>
        <span>CCV: </span>
        <div>
            <input class='paymentCCVInput' type="text" v-model="ccv" :maxlength=3 @keypress="onlyNumber" placeholder="CCV" />
        </div>
    </div>
  </div>

<button class="button" v-on:click="book()">Book</button>

</div>

</div>

</template>

<script>
import { Api } from '@/Api'

export default {
    name: 'Booking',
    props: ['activity'],
    methods: {
        /* Check that only numbers are input */
        onlyNumber($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which)
            if (keyCode < 48 || keyCode > 57) {
                $event.preventDefault()
            }
        },
        /* Book the activity (triggered by the Book button) or show error message if something is missing */
        book: function () {
            var msg = ''
            if (!this.selectedTimeslot) {
                msg = ' Please select a timeslot.'
                alert(msg)
            } else if (!this.selectedNoTickets) {
                msg = 'Please select the number of tickets.'
                alert(msg)
            } else if (this.selectedTimeslot && this.selectedNoTickets) {
                if (this.activity.type === 'Ride') {
                    if (this.paymentInputValid()) {
                        this.createBooking()
                        this.closeModal()
                    }
                } else { // Else it's not a ride and is a restaurant
                    this.createBooking()
                    this.closeModal()
                }
            }
        },
        /* Validate payment input, called when activity is a ride */
        paymentInputValid: function () {
            var msg = ''
            if (!this.cardNumber) {
                msg = 'Please insert card number.'
                alert(msg)
                return false
            } else if (this.cardNumber.length !== 16) {
                msg = 'Card number must be 16 characters.'
                alert(msg)
                return false
            } else if (!this.expMonth) {
                msg = "Please insert card's expiration month."
                alert(msg)
                return false
            } else if (Number(this.expMonth) < 1 || Number(this.expMonth) > 12) {
                msg = 'Please enter a valid month.'
                alert(msg)
                return false
            } else if (!this.expYear) {
                msg = "Please insert card's expiration year."
                alert(msg)
                return false
            } else if (Number(this.expYear) < (String(((new Date()).getFullYear())).slice(-2))) {
                msg = 'Year cannot be before ' + (new Date()).getFullYear() + '.'
                alert(msg)
                return false
            } else if (!this.ccv) {
                msg = "Please insert card's CCV."
                alert(msg)
                return false
            } else if (this.ccv.length !== 3) {
                msg = 'CCV must be 3 characters.'
                alert(msg)
                return false
            }
            return true
        },

        /* Close the booking modal */
        closeModal: function () {
            var modal = document.getElementById('bookingModal')
            modal.style.display = 'none'
        },
        /* Create a new booking by sending a POST request to the /bookings backend */
        /* When successful, it navigates to the confirmation page */
        createBooking: function () {
            var newBooking = {
                activityId: this.$route.params.id,
                ticketAmount: this.selectedNoTickets,
                timeslot: this.selectedTimeslot,
                pricePerTicket: this.activity.price,
                bookingTime: (new Date()).getTime() / 1000, // Might want to move this to backend / Divide by 1000 for correct conversion in the frontend
                totalPrice: this.activity.price * this.selectedNoTickets
            }
            Api.post('/bookings', newBooking)
                .then(response => {
                    this.newBookingId = response.data._id.toString()

                    this.$router.push({ name: 'confirmation', params: { id: this.newBookingId } }) // Navigate to the correct confirmation page
                })
                .catch(error => {
                    console.log(error)
                })
        },
        /* Returns today's current date */
        getCurrentDate: function () {
            var d = new Date()
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        },
        /* Returns current hour of the day */
        getCurrentHour: function () {
            return (new Date()).getHours()
        },
        /* Returns current minute of the day */
        getCurrentMinute: function () {
            return (new Date()).getMinutes()
        },
        getAvailability(b) {
            if (b.availableSpots === 0) {
                return 'unavailable'
            }
            if (parseInt(b.time.split(':')[0]) < this.getCurrentHour() || (parseInt(b.time.split(':')[0]) <= this.getCurrentHour() && parseInt(b.time.split(':')[1]) <= this.getCurrentMinute())) {
                return 'passed'
            }
            return 'available'
        }
    },
    data() {
        return {
            selectedTimeslot: '',
            selectedNoTickets: 0,
            cardNumber: '',
            expMonth: '',
            expYear: '',
            ccv: '',
            counter: 0,
            newBookingId: ''
        }
    }
}
</script>

<style scoped>
.modalContainer {
    margin: 5% auto; /* 15% from the top and centered */
    padding: 0px;      /* Can change depending on screen size */
    width: 100%;         /* Could be more or less, depending on screen size */
}

.bookingModal {
    background-color: whitesmoke;
    padding: 10px;      /* Can change depending on screen size */
    border-radius: 10px;
}
/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.bookingBoxContainer {
  margin-top: 15px;
}

.payment {
    margin-top: 15px;
}

.paymentCardInput {
    width: 10rem;
    margin-bottom: 15px;
}
.paymentExpInput {
    width: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
}
.paymentCCVInput {
    width: 3rem;
    text-align: center;
    margin-bottom: 15px;
}

.button {
  padding: 10px;
}

@media only screen and (min-width: 0px) and (max-width: 300px) {
    #timeslotTable {
        font-size: 8px;
    }
}

@media only screen and (min-width: 300px) and (max-width: 400px) {
    #timeslotTable {
        font-size: 9px;
    }
}

@media only screen and (min-width: 400px) and (max-width: 500px) {
    #timeslotTable {
        font-size: 10px;
    }
}

#timeslotTable {
    background: rgb(226, 255, 227);
    border: 1px solid rgba(255, 255, 255, 0.795);
    border-radius: 10px;
    padding: 0px;
    margin-bottom: 20px;
    margin-left: 0px;       /* Can change depending on screen size */
    margin-right: 0px;      /* Can change depending on screen size */

    text-align: center;
    justify-content: center;
    align-items: center;

    transition: .3s ease;
    box-shadow: 0px 0px 5px 1px rgb(134, 255, 150);
    filter: grayscale(50%);
    opacity: 0.7;
}

#timeslotTable:hover{
    transition: .3s ease;
    filter: grayscale(0%);
    opacity: 1;
}

#timeslotTableDate {
    font-size:20px;
    margin:20px;
}

#timeslotTableDate,
#selectedTimeslot {
    padding: 0px;
    font-weight: bold;
    color:rgba(0, 0, 0, 0.80);
}

#selectedTimeslotMessage {
    background: rgba(255, 174, 255, 0.795);
    border: 2px solid rgba(116, 255, 104, 0.795);
    border-radius: 100px;
    padding:10px;

    transition: .3s ease;
}

.timeslotTableRowHeader:after,
.timeslotTableRow:after {
    content: "";
    display: table;
    clear: both;

    transition: .3s ease;
}

.timeslotTableRow:hover {
    transition: .3s ease;
    background: rgb(122, 255, 128);
}

.timeslotTableColumnHeader,
.timeslotTableColumn {
    float: left;
    padding: 0px;
    width: 16.66%;
}

.timeslotTableColumnHeader {
    font-weight: bold;
    color:rgba(0, 0, 0, 0.80);
    text-decoration: underline;
}

</style>
