<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
  <div class="card-wrapper">
    <h1 class="title-pages">Games</h1>
   <ActivityCardList :activityType='"Game"'/>
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
