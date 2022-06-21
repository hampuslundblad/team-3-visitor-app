<template>
<div>
    <h3 class="pinkText">See busy hours!</h3>
    <div>
        <!-- Ok so this is weird, in order to change the background color 'variant' needs to be some invalid value.-->
        <b-dropdown id="dropdown-1" :text=selectedDay class="m-md-2 dropdownButton" variant="" >
            <b-dropdown-item-button class="dropdown-button" v-on:click='onClick(0)' >Monday</b-dropdown-item-button>
            <b-dropdown-item-button class="dropdown-button" v-on:click='onClick(1)'>Tuesday</b-dropdown-item-button>
            <b-dropdown-item-button class="dropdown-button" v-on:click='onClick(2)'>Wednesday</b-dropdown-item-button>
            <b-dropdown-item-button class="dropdown-button" v-on:click='onClick(3)'>Thursday</b-dropdown-item-button>
            <b-dropdown-item-button class="dropdown-button" v-on:click='onClick(4)'>Friday</b-dropdown-item-button>
            <b-dropdown-item-button class="dropdown-button" v-on:click='onClick(5)'>Saturday</b-dropdown-item-button>
             <b-dropdown-item-button class="dropdown-button" v-on:click='onClick(6)'>Sunday</b-dropdown-item-button>
        </b-dropdown>
    </div>
    <div class="busyHoursImageContainer">
      <img v-bind:src="imageSrc">
    </div>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            imageSrc: '',
            selectedDay: 'Select a day'
        }
    },
    methods: {
        onClick(day) {
            if (day === 0) {
                this.imageSrc = require('../assets/fri.png')
                this.selectedDay = 'Monday'
            } else if (day === 1) {
                this.imageSrc = require('../assets/mon2.png')
                this.selectedDay = 'Tuesday'
            } else if (day === 2) {
                this.imageSrc = require('../assets/fri.png')
                this.selectedDay = 'Wednesday'
            } else if (day === 3) {
                this.imageSrc = require('../assets/mon2.png')
                this.selectedDay = 'Thursday'
            } else if (day === 4) {
                this.imageSrc = require('../assets/fri.png')
                this.selectedDay = 'Friday'
            } else if (day === 5) {
                this.imageSrc = require('../assets/mon.png')
                this.selectedDay = 'Saturday'
            } else if (day === 6) {
                this.imageSrc = require('../assets/mon.png')
                this.selectedDay = 'Sunday'
            }
        }
    }
}
</script>

<style scoped>
.busyHoursImageContainer{
  padding:2rem;
  margin-right:auto;
  margin-left:auto;
}
.busyHoursImageContainer img{
    width:40rem;
}
.dropdown-button{
    font-family: "Bubblegum Sans";
}
.dropdownButton >>> .dropdown-toggle{
    color:#c45891 !important;
    background-color:#ebf0df !important;
    font-family: "Bubblegum Sans";
    text-transform: uppercase;
    padding:12px;
    border-width:2px;
    border-color:-internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
}

/* The image is too large on mobile so we'll scale it down a bit */
@media only screen and (max-width: 900px) {
  .busyHoursImageContainer img{
    width:12rem;
    }
}

</style>
