<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
  <div class="card-wrapper">
    <h1 class="title-pages">Deals</h1>
    <DealsCardList />
  </div>
</template>

<script>
import DealsCardList from './DealsCardList.vue'

export default {
    name: 'tickets',
    components: {
        DealsCardList
    },
    data() {
        return {
            message: ''
        }
    }
}
</script>
