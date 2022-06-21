<style src="./styles/VisitorApp.scss" lang="scss"></style>
<template>
  <div class="pinkText" :style="{ 'min-height': 100 + 'vh', 'width': windowWidth + 'px' }" id="app">
      <Navbar />

      <div v-show = !disableBreadcrumbs>
          <Breadcrumbs />
      </div>
            <div class="contentWrapper">
        <Map />
        <router-view />
      </div>
    <FooterComp/>
</div>
</template>
<script>

import Navbar from './components/Navbar.vue'
import Map from './components/Map.vue'
import FooterComp from './components/FooterComp.vue'
import Vue from 'vue'
import VueBreadcrumbs from 'vue-2-breadcrumbs'

Vue.use(VueBreadcrumbs)

export default {
    name: 'App',
    components: {
        Navbar,
        Map,
        FooterComp
    },
    data() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        }
    },
    created() {
        window.addEventListener('resize', this.myEventHandler)
    },

    mounted() {
        window.onresize = () => {
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
        }
    },
    computed: {
        disableBreadcrumbs() {
            if (this.$route.name === 'activity' || this.$route.name === 'deal' || this.$route.name === 'confirmationDeal' || this.$route.name === 'confirmation') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        myEventHandler(e) {
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
        }
    }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #ebf0df;
}
.contentWrapper {
    min-height:77vh;
    width: 100%;;
}
</style>
