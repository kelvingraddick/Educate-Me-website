<template>
  <v-main>
    <v-img
      src="/hero-2.jpg"
      class="hero-image"
      gradient="to top, rgba(255,255,255,.33), rgba(255,255,255,1)"
    >
      <v-container>
        <div class="text-h4 font-weight-bold mt-5">
          JOBS
        </div>
        <div class="red-bar"></div>
        <div class="text-h5 mt-5">
          Search and view jobs
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
              <v-select
                :items="searchTypes"
                v-model="searchType"
                label="Category"
                color="white"
                class="search-text-field"
                outlined
                dense
                required
              ></v-select>
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
          <template v-for="(job, index) in jobs">
            <v-divider
              v-if="index > 0"
              :key="index"
              inset
            ></v-divider>
            <v-list-item
              :key="job._id"
              @click="navigate('/job/' + job._id)"
            >
              <v-list-item-avatar>
                <v-img :src="job.imageUrl || '/placeholder-job.png'"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="job.title" class="font-weight-bold">></v-list-item-title>
                <v-list-item-subtitle v-html="job.schoolLevel"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="job.city + ', ' + job.state"></v-list-item-subtitle>
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
  import Jobs from '@/helpers/jobs.js';

  export default {
    components: {
    },
    data: function() {
      return {
        content: Content,
        searchTitle: undefined,
        searchTypes: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
        searchType: undefined,
        searchLocation: undefined,
        jobs: undefined
      }
    },
    async asyncData({ params }) {
			return Jobs.search(10, 0, '', '', '');
    },
    methods: {
      async search() {
        var response = await Jobs.search(10, 0, this.searchTitle || '', this.searchType || '', this.searchLocation || '');
        this.jobs = response.jobs;
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
