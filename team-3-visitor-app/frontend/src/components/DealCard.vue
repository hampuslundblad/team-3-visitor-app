<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
  <router-link class="cardLink" :to="'deals/' + deal.id">
    <b-list-group-item class="card pinkText box">
      <img alt="Attraction" :src="deal.cardImage" />
      <div class="text-container">
        <h2 class="pinkText">{{ this.deal.name }}</h2>
        <p class="bold">Description:</p>
        <p>{{ deal.descriptionShort }}</p>
      </div>
    </b-list-group-item>
  </router-link>
</template>

<script>
export default {
    name: 'Deal-Item',
    props: ['deal'],
    data() {
        return {}
    }
}
</script>

<style scoped>
.bold {
  float: left;
  font-weight: bold;
  margin-right: 0.1rem;
}

p {
  font-size: 12px;
  text-align: left;
  margin-bottom: 0px;
}

a:hover {
  text-decoration: none;
}

.card:hover {
  transform: scale(
    1.05
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

a {
  margin: 10px;
}

img {
  width: 100%;
}

.cardLink {
  height: 250px;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid;
}

.card {
  transition: transform 0.2s; /* Animation */
  background: white;
  width: 12rem;
  min-width: 12rem;
  height: 16rem;
  min-height: 16rem;
}

.text-container {
  margin-top: 1rem;
}

.box {
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;
}
</style>
