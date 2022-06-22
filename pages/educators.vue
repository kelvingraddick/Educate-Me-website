<template>
  <v-main>
    <v-img
      src="/hero-2.jpg"
      class="hero-image"
      gradient="to top, rgba(255,255,255,.33), rgba(255,255,255,1)"
    >
      <v-container>
        <div class="text-h4 font-weight-bold mt-5">
          EDUCATORS
        </div>
        <div class="red-bar"></div>
        <div class="text-h5 mt-5">
          Search and view educators
        </div>
        <v-card
          class="card d-block mt-2 px-2"
          outlined
          color="primary"
        >
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="searchTitle"
                label="Job title"
                color="white"
                class="search-text-field"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="searchLocation"
                label="Location"
                color="white"
                class="search-text-field"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-btn depressed @click="search" class="submit-button font-weight-bold" color="error" height="40">
                Search &nbsp;
                <v-icon>mdi-database-search</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-img>
    <v-container>
      <v-card
        class="mt-5"
        outlined
      >
        <v-list three-line>
          <template v-for="(educator, index) in educators">
            <v-divider
              v-if="index > 0"
              :key="index"
              inset
            ></v-divider>
            <v-list-item
              :key="educator._id"
              @click="navigate('/educator/' + educator._id)"
            >
              <v-list-item-avatar>
                <v-img :src="educator.imageUrl || '/placeholder-educator.png'"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="educator.name && (educator.name.first + ' ' + educator.name.last)" class="font-weight-bold">></v-list-item-title>
                <v-list-item-subtitle v-html="educator.title"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="(educator.locations && educator.locations[0]) || ''"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
  import Content from '@/content/pages/home.json';
  import Educators from '@/helpers/educators.js';

  export default {
    components: {
    },
    data: function() {
      return {
        content: Content,
        searchTitle: '',
        searchLocation: '',
        educators: undefined
      }
    },
    async asyncData({ $config, params }) {
			return Educators.search($config.EDCOM_HQ_JOBS_API_BASE_URL, 10, 0, '', '');
    },
    methods: {
      async search() {
        var response = await Educators.search(this.$config.EDCOM_HQ_JOBS_API_BASE_URL, 10, 0, this.searchTitle, this.searchLocation);
        this.educators = response.educators;
      },
      async navigate(path) {
        this.$router.push({ path: path });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero-image {
    height: auto;
  }
  
  .card {
    width: auto;
    height: auto;
  }

  .search-text-field label,
  .search-text-field input,
  .search-text-field input::placeholder {
    color: white !important;
  }

  .submit-button {
    width: 100%;
  }

  .red-bar {
    width: 50%;
    height: 5px;
    background-color: rgb(255, 82, 82);
    border-radius: 4px;
  }

  @media only screen and (min-width: 960px) {
    .hero-image {
      height: 250px;
    }
    
    .card {
      width: 100%;
      height: 65px;
    }
  }

  @media only screen and (min-width: 1264px) {
    .container {
      width: 1264px;
    }
  }
</style>
