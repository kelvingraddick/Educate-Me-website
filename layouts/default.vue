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
          alt="EDCOM HQ Jobs"
          max-width="250"
          contain
        ></v-img>
        <v-spacer />
        <nuxt-link to="/home" class="link d-none d-md-flex mx-4">Home</nuxt-link>
        <nuxt-link to="/about" class="link d-none d-md-flex mx-4">About</nuxt-link>
        <nuxt-link to="/jobs" class="link d-none d-md-flex mx-4">Jobs</nuxt-link>
        <nuxt-link to="/educators" class="link d-none d-md-flex mx-4">Educators</nuxt-link>
        <nuxt-link to="/contact" class="link d-none d-md-flex mx-4">Contact</nuxt-link>
        <v-btn depressed large next to="/register/educator" class="font-weight-bold d-none d-md-flex ml-3 mr-1" color="primary">
          Find a job &nbsp;
          <v-icon>mdi-briefcase-search</v-icon>
        </v-btn>
        <v-btn depressed large next to="/register/employer" class="font-weight-bold d-none d-md-flex ml-1" color="error">
          Find an educator &nbsp;
          <v-icon>mdi-account-search</v-icon>
        </v-btn>
        <v-btn
          color="black"
          v-show="this.$store.state.educator || this.$store.state.employer"
          @click.stop="onAccountButtonClick"
          icon
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn
          color="black"
          @click.stop="isNavigationDrawerOpen = !isNavigationDrawerOpen"
          icon
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main class="pt-15">
      <nuxt />
    </v-main>
    <v-footer
      color="black"
      padless
    >
      <v-row
        justify="center"
        no-gutters
        class="py-4"
      >
        <nuxt-link to="/home" class="link white--text mx-4">Home</nuxt-link>
        <nuxt-link to="/about" class="link white--text mx-4">About</nuxt-link>
        <nuxt-link to="/jobs" class="link white--text mx-4">Jobs</nuxt-link>
        <nuxt-link to="/educators" class="link white--text mx-4">Educators</nuxt-link>
        <nuxt-link to="/contact" class="link white--text mx-4">Contact</nuxt-link>
        <v-col
          class="black pt-2 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>EDCOM HQ Jobs</strong>
        </v-col>
      </v-row>
    </v-footer>
    <v-navigation-drawer
      v-model="isNavigationDrawerOpen"
      absolute
      temporary
      right
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-chevron-right</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title><nuxt-link to="/home" class="link">Home</nuxt-link></v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-chevron-right</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title><nuxt-link to="/about" class="link">About</nuxt-link></v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-chevron-right</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title><nuxt-link to="/jobs" class="link">Jobs</nuxt-link></v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-chevron-right</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title><nuxt-link to="/educators" class="link">Educators</nuxt-link></v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-chevron-right</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title><nuxt-link to="/contact" class="link">Contact</nuxt-link></v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn depressed large next to="/register/educator" class="font-weight-bold d-flex mx-6 mb-2" color="primary">
        Find a job &nbsp;
        <v-icon>mdi-briefcase-search</v-icon>
      </v-btn>
      <v-btn depressed large next to="/register/employer" class="font-weight-bold d-flex mx-6" color="error">
        Find an educator &nbsp;
        <v-icon>mdi-account-search</v-icon>
      </v-btn>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        isNavigationDrawerOpen: false
      }
    },
    mounted: function() {
      
    },
    methods: {
      async onAccountButtonClick() {
        if (this.$store.state.educator) {
          this.$router.push({ path: '/educator/' + this.$store.state.educator._id });
        } else if (this.$store.state.employer) {
          this.$router.push({ path: '/employer/' + this.$store.state.employer._id });
        }
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
    overflow-x: hidden;
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
