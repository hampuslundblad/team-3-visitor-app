<template>
  <footer class="footer navBarPinkColor">
    <div class="infoWrapper">
      <div class="infoContainer">
        <div class="iconTextContainer">
          <div class="icon">
            <font-awesome-icon
              :icon="['fa', 'house-user']"
              size="lg"
            ></font-awesome-icon>
          </div>
          <h3>Adress</h3>
        </div>
        <p>Örgrytevägen 5, 402 22 Göteborg</p>
      </div>
      <div class="infoContainer">
        <div class="iconTextContainer">
          <div class="icon">
            <font-awesome-icon
              :icon="['fa', 'phone-alt']"
              size="lg"
            ></font-awesome-icon>
          </div>
          <h3>Telephone</h3>
        </div>
        <a href="tel:031-722 97 42">031-722 97 42</a>
      </div>
      <div class="infoContainer">
        <div class="iconTextContainer">
          <div class="icon">
            <font-awesome-icon
              :icon="['fa', 'envelope']"
              size="lg"
            ></font-awesome-icon>
          </div>
          <h3>E-mail</h3>
        </div>
        <a href="mailto:TheAmusementPark@park.com">TheAmusementPark@park.com</a>
      </div>
      <div class="infoContainer">
        <div class="iconTextContainer">
          <div class="icon">
            <font-awesome-icon
              :icon="['fa', 'info-circle']"
              size="lg"
            ></font-awesome-icon>
          </div>
          <div>
            <h3>Links</h3>
          </div>
        </div>
        <ul class="links">
          <li><a href="aboutus">About us</a></li>
          <li><a href="faq">FAQ</a></li>
          <li><a href="privacypolicy">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    name: 'footercomp'
}
</script>

<style scoped>
.footer {
  min-height: 11rem;
  width: 100%;
  color: #ebf0df;
  padding-top: 3rem;
  padding-bottom: 1rem;
}
.icon {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0.5rem;
}
.infoContainer {
  display: flex;
  flex-direction: column;
  color: #ebf0df;
}
.infoContainer a {
  color: #ebf0df;
}
.infoWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.iconTextContainer {
  display: flex;
}
.iconTextContainer h3 {
  margin-top: auto;
  margin-bottom: auto;
}
.links {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

@media only screen and (max-width: 900px) {
  .footer h3 {
    font-size: 1rem;
  }
  .infoWrapper {
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    width: 12rem;
  }
  .infoContainer {
    margin-bottom: 1.5rem;
  }
}
</style>
