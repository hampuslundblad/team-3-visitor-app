<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
  <!-- Mobile (< 768px): stack columns by making one half-width and one full-width
           Desktop (>= 768px): keep both columns in same row in 4:8 ratio -->
  <div class="wrapper">
   <ActivityCardList :activityType='"All"'/>
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
            message: ''
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
        }
    }
}
</script>
<style scoped>
.wrapper{
  width:50%;
  margin-right: auto;
  margin-left: auto;
}
</style>
