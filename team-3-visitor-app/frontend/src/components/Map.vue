<template>
<div class="container">
    <img alt="map" src="../assets/map1_edited_numbered.png" class ="img-fit" v-show="frontPage">
</div>
</template>

<script>

export default {
    name: 'map',
    // Limit map display to front page only
    computed: {
        frontPage() {
            if (this.$route.path === '/') {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>
.img-fit{
  height: 60%;
  width: 60%;
  margin-top: 70px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  display: flex;
  background-color: #ebf0df;
  align-items: center;
}
</style>
