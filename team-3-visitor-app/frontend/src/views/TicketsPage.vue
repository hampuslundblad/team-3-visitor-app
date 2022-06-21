<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
  <div class="card-wrapper">
    <h1 class="title-pages">Tickets</h1>
    <TicketCardList />
    <h1 class="title-pages">Bought Deals</h1>
    <BookedDealsCardList />
  </div>
</template>

<script>
import { Api } from '@/Api'
import TicketCardList from './TicketCardList.vue'
import BookedDealsCardList from './BookedDealsCardList.vue'

export default {
    name: 'tickets',
    components: {
        TicketCardList,
        BookedDealsCardList
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
                .then((response) => {
                    this.message = response.data.message
                })
                .catch((error) => {
                    this.message = error
                })
        }
    }
}
</script>
