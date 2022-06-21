<style src="../styles/VisitorApp.scss" lang="scss"></style>
<template>
  <router-link class="cardLink" :to="'activity/' + activity.id">

  <b-list-group-item class="card pinkText box" >

    <div v-if="activity.open === false" class="status closed bold">
        <p>CLOSED</p>
    </div>

    <img alt="Attraction" :src=activity.cardImage />
    <img alt="Icon" :src=activity.icon class = "icon" />

    <div class="text-container">
        <h2 class="pinkText"> {{activity.name}} </h2>
        <div v-if="activity.type === 'Ride'">
            <p class="bold"> Location:</p><p> {{activity.location}}</p>
            <p class="bold"> Type:</p><p> {{activity.subtype}} ride</p>
            <div v-if="activity.averageTime"><p class="bold"> Avg. wait time: </p><p>{{activity.averageTime}} mins</p></div>
        </div>
        <div v-else>
            <p class="bold"> Location:</p><p> {{activity.location}}</p>
            <p class="bold"> Type:</p><p> {{activity.type}} </p>
            <div v-if="activity.averageTime"><p class="bold"> Avg. wait time: </p><p>{{activity.averageTime}} mins</p></div>
        </div>
    </div>
  </b-list-group-item>
  </router-link>

</template>

<script>

export default {
    name: 'Activity-Item',
    props: ['activity']
}
</script>

<style scoped>
.bold {
  float:left;
  font-weight:bold;
  margin-right:0.1rem;
}
p {
  font-size:12px;
  text-align:left;
  margin-bottom:0px;
}

a:hover {
  text-decoration: none;
}
a {
  margin:10px;
}

img {
  width: 100%;

}
.icon {
  height: 20px;
  width: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.cardLink{
  height: 290px;
}

h2 {
 text-align: center;
 font-size:16px;
 font-weight:bold;
 border-bottom:1px solid ;
}

.card:hover {
  transform: scale(1.05); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.card {
  transition: transform .2s; /* Animation */
  background: white;

  width:12rem;
  min-width:12rem;

  height:18rem;
  min-height:16rem;

}

.text-container{
  margin-top:1rem;
}
.box {
  -webkit-box-shadow: 0 10px 6px -6px #777;
     -moz-box-shadow: 0 10px 6px -6px #777;
          box-shadow: 0 10px 6px -6px #777;
}

.status {
    width: 50%;
    position: absolute;
}

.closed {
    color: red;
}

</style>
