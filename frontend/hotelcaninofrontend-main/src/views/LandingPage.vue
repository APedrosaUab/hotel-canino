<template>
  <div class="landing-page text-white">
    <div class="landing-page-hero-container">
      <div class="landing-page-hero-title-wrapper">
        <h1 class="landing-page-hero-title">Hotel Canino</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.landing-page {
  min-height: 90vh;
  width: 100%;
  max-width: 1920px;
  background-image: url("@/assets/images/landingPage.jpg");
  background-size: cover;
  background-position: center;
  background-color: #f9f7ef;
  color: #3a3a3a;
}

.landing-page-hero-container {
  position: relative;
  height: 60vh;
  background-image: url("@/assets/images/hero.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.landing-page-hero-title-wrapper {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.landing-page-hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffe66d;
  text-shadow: 2px 2px #3a3a3a;
}
</style>
