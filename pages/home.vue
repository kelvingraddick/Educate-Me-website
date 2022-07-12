<template>
  <v-main>
    <v-img
      src="/hero-2.jpg"
      class="hero-image"
      gradient="to top, rgba(255,255,255,.33), rgba(255,255,255,1)"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="8" class="d-flex flex-column justify-center">
            <div class="text-h5 font-weight-bold">
              {{content['Hero Sub-Title Text']}}
            </div>
            <div class="text-h3 font-weight-bold">
              {{content['Hero Title Text']}}
            </div>
          </v-col>
          <v-col cols="12" md="4" class="d-flex flex-column justify-center">
            <v-img
              src="/teachers-and-kids-graphic.png"
              class="graphic-image"
              contain
            />
          </v-col>
        </v-row>
        <div class="text-h6 font-weight-medium mt-2">
          <span class="darkgrey--text" v-html="content['Search Title Text']"></span>
        </div>
        <v-btn outlined medium v-on:click="currentSearchType = searchTypes.JOBS" class="font-weight-bold mt-3" color="grey">
          <span :class="currentSearchType == searchTypes.JOBS ? 'black--text' : ''">Find a job <v-icon>mdi-briefcase-search</v-icon></span>
        </v-btn>
        <v-btn outlined medium v-on:click="currentSearchType = searchTypes.EDUCATORS" class="font-weight-bold mt-3" color="grey">
          <span :class="currentSearchType == searchTypes.EDUCATORS ? 'black--text' : ''">Find an educator <v-icon>mdi-account-search</v-icon></span>
        </v-btn>
        <v-card
          class="card d-block mt-2 px-2 py-2"
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
            <v-col cols="12" md="3" v-show="currentSearchType == searchTypes.JOBS">
              <v-select
                :items="searchCategories"
                v-model="searchCategory"
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
              <v-btn depressed next :to="'/' + currentSearchType" class="submit-button font-weight-bold" color="error" height="40">
                Search &nbsp;
                <v-icon>mdi-database-search</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-img>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="d-flex flex-column justify-center">
          <v-img
            src="/woman-teacher.png"
            class="graphic-image"
            contain
          />
        </v-col>
        <v-col cols="12" md="8" class="d-flex flex-column justify-center">
          <div class="text-h4 font-weight-bold">
            {{content['About Section Title Text']}}
          </div>
          <div class="red-bar"></div>
          <div class="text-h5 font-weight-medium mt-3" v-html="content['About Section Description Text']"></div>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="gray-section">
      <v-col cols="12" md="12" class="d-flex flex-column justify-center">
        <v-container class="py-8">
          <div class="text-h4 font-weight-bold">
            OUR PROGRAMS
          </div>
          <div class="red-bar"></div>
          <div class="d-flex" style="width: 100%; overflow-x: scroll;">
            <v-card
              class="mt-10 mr-5"
              max-width="344"
              outlined
            >
              <v-img
                :src="content['Program 1 Image URL']"
                height="200px"
              ></v-img>
              <v-card-title class="font-weight-bold">{{content['Program 1 Title Text']}}</v-card-title>
              <v-card-subtitle>
                {{content['Program 1 Sub-Title Text']}}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn @click="navigate(content['Program 1 Link URL'])" text>Apply / Learn More</v-btn>
              </v-card-actions>
            </v-card>
            <v-card
              class="mt-10 mr-5"
              max-width="344"
              outlined
            >
              <v-img
                :src="content['Program 2 Image URL']"
                height="200px"
              ></v-img>
              <v-card-title class="font-weight-bold">{{content['Program 2 Title Text']}}</v-card-title>
              <v-card-subtitle>
                {{content['Program 2 Sub-Title Text']}}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn @click="navigate(content['Program 2 Link URL'])" text>Apply / Learn More</v-btn>
              </v-card-actions>
            </v-card>
            <v-card
              class="mt-10 mr-5"
              max-width="344"
              outlined
            >
              <v-img
                :src="content['Program 3 Image URL']"
                height="200px"
              ></v-img>
              <v-card-title class="font-weight-bold">{{content['Program 3 Title Text']}}</v-card-title>
              <v-card-subtitle>
                {{content['Program 3 Sub-Title Text']}}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn @click="navigate(content['Program 3 Link URL'])" text>Apply / Learn More</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-container>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="py-8">
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <div class="text-h4 font-weight-bold">
            JOBS
          </div>
          <div class="red-bar"></div>
          <v-card
            class="mt-5"
            outlined
          >
            <v-list three-line>
              <template v-for="(job, index) in jobs">
                <v-divider
                  v-if="index > 0"
                  :key="job.id + '-divider'"
                  inset
                ></v-divider>
                <v-list-item
                  :key="job.id"
                  @click="navigate('/job/' + job.id)"
                >
                  <v-list-item-avatar>
                    <v-img :src="job.imageUrl || '/placeholder-job.png'"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="job.title" class="font-weight-bold"></v-list-item-title>
                    <v-list-item-subtitle v-html="job.schoolLevel"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="job.city + ', ' + job.state"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <div class="text-h4 font-weight-bold">
            EDUCATORS
          </div>
          <div class="red-bar"></div>
          <v-card
            class="mt-5"
            outlined
          >
            <v-list three-line>
              <template v-for="(educator, index) in (educators || []).slice().sort(() => 0.5 - Math.random()).slice(0, 3)">
                <v-divider
                  v-if="index > 0"
                  :key="educator._id + '-divider'"
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
        </v-col>
      </v-row>
    </v-container>
    <v-row class="gray-section">
      <v-col cols="12" md="12" class="d-flex flex-column justify-center">
        <v-container class="py-8">
          <div class="text-h4 font-weight-bold">
            {{content['Contact Section Title Text']}}
          </div>
          <div class="red-bar"></div>
          <div class="text-h5 font-weight-medium mt-3">
            {{content['Contact Section Sub-Title Text']}}
            <v-btn depressed next to="/contact" class="submit-button font-weight-bold mt-3" color="error" height="40">
              Contact Us &nbsp;
              <v-icon>mdi-phone</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
  import Content from '@/content/pages/home.json';
  import Educators from '@/helpers/educators.js';
  import Jobs from '@/helpers/jobs.js';

  export default {
    components: {
    },
    data: function() {
      return {
        content: Content,
        searchTypes: {
          JOBS: 'jobs',
          EDUCATORS: 'educators'
        },
        currentSearchType: 'jobs',
        searchCategories: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
        searchTitle: undefined,
        searchCategory: undefined,
        searchLocation: undefined,
        jobs: undefined,
        educators: undefined
      }
    },
    async asyncData({ $config, params }) {
      var educatorsSearch = await Educators.search($config.EDCOM_HQ_JOBS_API_BASE_URL, 3, 0, '', '');
      var jobsSearch = await Jobs.search($config.EDCOM_HQ_JOBS_API_BASE_URL, 3, 0, '', '', '');
      return { educators: educatorsSearch?.educators, jobs: jobsSearch?.jobs };
    },
    methods: {
      async navigate(path) {
        this.$router.push({ path: path });
      }
    }
  }
</script>

<style lang="scss" scoped>

  @media only screen and (min-width: 960px) {
    .card {
      width: 100%;
      height: 65px;
    }
  }

</style>
