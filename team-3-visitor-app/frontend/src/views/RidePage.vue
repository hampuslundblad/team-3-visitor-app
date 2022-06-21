<style lang="scss">
    @import "../styles/VisitorApp.scss";
</style>

<template>
<div>
    <div class="card-wrapper">
        <div>
            <h1 class="title-pages">{{ridesShown}}</h1>
            <b-dropdown id="dropdown-category" text= "Filter by" class="m-md-2 category-dropdown dropdownButton" variant="">
                <b-dropdown-item-button class="dropdown-button" v-on:click='onFilterClicked("")' >All Rides</b-dropdown-item-button>
                <b-dropdown-item-button class="dropdown-button" v-on:click='onFilterClicked("Water")' >Water Rides</b-dropdown-item-button>
                <b-dropdown-item-button class="dropdown-button" v-on:click='onFilterClicked("Kids")' >Kid Rides</b-dropdown-item-button>
                <b-dropdown-item-button class="dropdown-button" v-on:click='onFilterClicked("Extreme")' >Extreme Rides</b-dropdown-item-button>
                <b-dropdown-item-button class="dropdown-button" v-on:click='onFilterClicked("Family")' >Family Rides</b-dropdown-item-button>
            </b-dropdown>
        </div>
        <ActivityCardList :activityType='"Ride"' :subtype="this.subType"/>
  </div>
</div>
</template>
<script>

// @ is an alias to /src
import { Api } from '@/Api'
import ActivityCardList from './ActivityCardList.vue'

export default {
    name: 'home',
    components: {
        ActivityCardList
    },
    data() {
        return {
            message: '',
            listOfActivities: [],
            ridesShown: 'Rides',
            subType: ''

        }
    },
    mounted() {
        this.getMessage()
    },
    methods: {
        getMessage() {
            Api.get('/')
                .then(response => {
                    this.message = response.data.message
                })
                .catch(error => {
                    this.message = error
                })
        },
        onFilterClicked(subType) {
            this.ridesShown = subType + ' Rides'
            this.subType = subType
        }
    }
}
</script>
<style scoped>
    .category-dropdown{
        float: right;
        font-family: "Bubblegum Sans";

    }
    .dropdownButton >>> .dropdown-toggle{
        color:#c45891 !important;
        background-color:#ebf0df !important;
        font-family: "Bubblegum Sans";
        text-transform: uppercase;
        padding:12px;
        border-width:2px;
        border-color:#c45891 !important;
    }
    .dropdownButton >>> .dropdown-toggle:hover{
        box-shadow: 0px 0px 5px #c45891;
    }
    .dropdownButton >>> .dropdown-toggle:hover:focus:active{
        box-shadow: 0px 0px 10px #c45891;
    }
    .dropdownButton >>> .dropdown-toggle:focus{
        box-shadow: none;
    }
</style>
