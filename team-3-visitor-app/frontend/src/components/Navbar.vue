<template>
  <div class='navbar navBarPinkColor font-effect-outline'>
    <b-navbar toggleable='lg' class="navbar">

      <b-navbar-toggle target='nav-collapse'></b-navbar-toggle>
      <b-collapse id='nav-collapse' is-nav>

        <b-navbar-nav>
          <b-navbar-brand href='/' class="navbar-item">
            <router-link class='navBarPinkColor logo' to='/'>
              <img class="logo" src="../assets/logo_green.png"/>
            </router-link>
          </b-navbar-brand>
          <b-nav-item href='#' class="navbar-item">
            <router-link class='navBarPinkColor item' to='/rides'>Rides</router-link>
          </b-nav-item>
          <b-nav-item href='#'  class="navbar-item">
            <router-link class='navBarPinkColor item' to='/restaurants'>Restaurants</router-link>
          </b-nav-item>

            <b-nav-item href='#'  class="navbar-item" >
              <router-link class='navBarPinkColor item' to='/games'>Games</router-link>
              </b-nav-item>
             <b-nav-item href="#" class="navbar-item">
             <router-link class="navBarPinkColor item" to="/deals">Deals</router-link>
            </b-nav-item>
            <b-nav-item href='#'  class="navbar-item">
            <router-link class='navBarPinkColor item' to='/tickets'>Tickets</router-link>
            </b-nav-item>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right> -->
        <!-- Using 'button-content' slot -->
        <!-- <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: 'navbar'
}
</script>

<style scoped>
.navbar{
display: flex;
align-content: center;
}

.item{
  position: relative;
  text-decoration: none;
  padding:0px 7px 7px 7px;
  text-shadow: 0px;
}

.item:hover{
  color:#ebf0df;

}
/* Responsible for the underline effect */
.item::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ebf0df;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}
.item:hover::before {
  visibility: visible;
  transform: scaleX(1);
}

.logo {
font-size:1.4rem;
width:8rem;
}
.navbar-item{
  margin-right:3rem;
}

.navbar-item a{
  text-decoration:none;
}
.navbar-item:hover{
  text-decoration:none;
}
@media (max-width: 990px) {
  /* CSS that should be displayed if width is equal to or less than 800px goes here */
  .navbar{
    margin-left:0;
    margin-right:0;
  }
}
</style>
