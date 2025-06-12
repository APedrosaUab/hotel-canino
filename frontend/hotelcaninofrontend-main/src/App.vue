<template>
  <div class="bg-dark text-light">
    <NavBar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import AppFooter from './components/Footer.vue';

export default {
  name: "App",
  components: {
    NavBar,
    AppFooter
  }
};
</script>

<style>
html {
  background-color: #212529;
}

body {
  max-width: 1960px;
  margin: auto !important;
}

.bg-dark.text-light {
  background-color: #f9f7ef!important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}

.row {
  --bs-gutter-x: unset !important;
  --bs-gutter-y: unset !important;
}

.container {
  min-height: 80vh;
  margin-top: 30px;
}

.content {
  width: 100%;
  max-width: 1920px;
}

.form-floating, .btn {
  max-width: 96%;
}

.whiteBorder {
  border: 1px solid #fff;
  border-radius: 2px;
  margin: 1%;
  max-width: 46% !important;
  padding: 2em;
  text-align: left;
}

.detailsContent {
  text-align: left;
}

.detailsContent h2 {
  color: rgb(170, 1, 1);
  font-weight: 600;
  padding: 0 20px 20px 0px;
}

.detailsContent strong {
  color: lightblue;
  font-weight: 600;
}

@media screen and (max-width: 991px) {
  .container {
    margin-top: 10px;
  }
}

@media screen and (max-width: 767px) {
  .whiteBorder {
    max-width: 98% !important;
  }

  .detailsContent {
    margin-top: 2em !important;
  }
}
</style>
