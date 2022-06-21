<template>
  <div class="modalContainer">
    <div class="bookingModal">
      <span class="close" v-on:click="closeModal">&times;</span>
      <div>
        <h3 class="pinkText">Name: {{ deal.name }}</h3>
        <p>Ticket price: {{ deal.price }}</p>
      </div>

      <div class="bookingBoxContainer">
        <span>Select number of people</span>
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

      <div class="bookingBoxContainer">
        <h3 class="pinkText">
          Total Price: {{ deal.price * selectedNoTickets }}
        </h3>
      </div>

      <div class="payment">
        <div class="paymentCard">
          <span>Card number: </span>
          <div>
            <input
              class="paymentCardInput"
              type="text"
              v-model="cardNumber"
              :maxlength="16"
              @keypress="onlyNumber"
              placeholder="Card number"
            />
          </div>
        </div>
        <div class="paymentExp">
          <span>Expiration date: </span>
          <div>
            <input
              class="paymentExpInput"
              type="text"
              v-model="expMonth"
              :maxlength="2"
              @keypress="onlyNumber"
              placeholder="MM"
            />
            <input
              class="paymentExpInput"
              type="text"
              v-model="expYear"
              :maxlength="2"
              @keypress="onlyNumber"
              placeholder="YY"
            />
          </div>
        </div>
        <div class="paymentCCV">
          <span>CCV: </span>
          <div>
            <input
              class="paymentCCVInput"
              type="text"
              v-model="ccv"
              :maxlength="3"
              @keypress="onlyNumber"
              placeholder="CCV"
            />
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
    name: 'DealsBooking',
    props: ['deal'],
    methods: {
    /* Check that only numbers are input */
        onlyNumber($event) {
            let keyCode = $event.keyCode ? $event.keyCode : $event.which
            if (keyCode < 48 || keyCode > 57) {
                $event.preventDefault()
            }
        },
        /* Book the activity (triggered by the Book button) or show error message if something is missing */
        book: function () {
            var msg = ''
            // eslint-disable-next-line
      if (!this.selectedNoTickets) {
                msg = 'Please select the number of tickets.'
                alert(msg)
            } else if (this.selectedNoTickets) {
                if (this.paymentInputValid()) {
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
            } else if (
                Number(this.expYear) < String(new Date().getFullYear()).slice(-2)
            ) {
                msg = 'Year cannot be before ' + new Date().getFullYear() + '.'
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
                dealId: this.deal.id,
                ticketAmount: this.selectedNoTickets,
                pricePerTicket: this.deal.price,
                bookingTime: new Date().getTime() / 1000, // Might want to move this to backend / Divide by 1000 for correct conversion in the frontend
                totalPrice: this.deal.price * this.selectedNoTickets
            }
            Api.post('/dealBookings', newBooking)
                .then((response) => {
                    this.newBookingId = response.data._id.toString()

                    this.$router.push({
                        name: 'confirmationDeal',
                        params: { id: this.newBookingId }
                    }) // Navigate to the correct confirmation page
                })
                .catch((error) => {
                    console.log(error)
                })
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
  padding: 20px;
  width: 70%; /* Could be more or less, depending on screen size */
}

.bookingModal {
  background-color: whitesmoke;
  padding: 20px;
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
</style>
