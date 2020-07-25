<template>
  <v-app id="app">
    <v-app-bar
      fixed
      color="white"
      elevate-on-scroll
      large
    >
      <v-container class="d-flex align-center">
        <v-img
          src="/logo-1.png"
          max-width="190"
          contain
        ></v-img>
        <v-spacer />
        <nuxt-link to="/inspire" class="link mx-5">Home</nuxt-link>
        <nuxt-link to="/inspire" class="link mx-5">About</nuxt-link>
        <nuxt-link to="/inspire" class="link mx-5">Jobs</nuxt-link>
        <nuxt-link to="/inspire" class="link mx-5">Canindates</nuxt-link>
        <nuxt-link to="/inspire" class="link mx-5">Contact</nuxt-link>
        <v-btn depressed large next to="/inspire" class="font-weight-bold ml-3 mr-1" color="primary">
          Find a job &nbsp;
          <v-icon>mdi-briefcase-search</v-icon>
        </v-btn>
        <v-btn depressed large next to="/inspire" class="font-weight-bold ml-1" color="error">
          Find a candidate &nbsp;
          <v-icon>mdi-account-search</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main class="pt-15">
      <nuxt />
    </v-main>
    <v-footer
      :absolute="true"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Educate Me'
      }
    }
  }
</script>

<style lang="scss">
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    color: #353535;
  }
  
  .link {
    font-size: 15px;
    font-weight: 600;
    color: #353535;
    letter-spacing: 0px;
    text-decoration: none;
  }

  .v-application a {
    color: #353535;
  }

  .v-btn {
    font-size: 15px !important;
    font-weight: 600 !important;
    letter-spacing: 0px !important;
    text-transform: none !important;
  }
</style>
