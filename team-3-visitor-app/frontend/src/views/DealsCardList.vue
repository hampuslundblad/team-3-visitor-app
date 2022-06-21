<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
  <b-list-group class="card-list flex-wrap" horizontal>
    <DealCard
      class=".ml-3"
      v-for="deal in deals"
      :key="deal._id"
      :deal="deal"
    ></DealCard>
  </b-list-group>
</template>

<script>
import DealCard from '../components/DealCard'
import { Api } from '@/Api'

export default {
    name: 'Deals',
    data() {
        return {
            deals: []
        }
    },
    mounted() {
        this.getDeals()
    },
    methods: {
        getDeals() {
            Api.get('deals/')
                .then((response) => {
                    this.deals = response.data.deals
                    console.log('TEXT', response)
                })
                .catch((error) => {
                    this.deals = []
                    console.log(error)
                })
                .then(() => {
                    // This code is always executed (after success or error).
                })
        }
    },
    components: {
        DealCard
    }
}
</script>

<style scoped>
a {
  color: #42b983;
}

.card-list {
  display: flex;
  justify-content: center;
  margin: 0;
  padding-bottom: 2rem;
  overflow-y: auto;
  width: 100%;
}
</style>
