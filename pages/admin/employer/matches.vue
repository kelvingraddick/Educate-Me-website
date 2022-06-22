<template>
  <v-main>
    <v-img
      src="/hero-2.jpg"
      class="hero-image"
      gradient="to top, rgba(255,255,255,.33), rgba(255,255,255,1)"
    >
      <v-container>
        <div class="text-h4 font-weight-bold mt-5">
          ADMIN / EMPLOYER / ECUCATOR MATCHES
        </div>
        <div class="red-bar"></div>
        <div class="text-h5 mt-5">
          Administor over the EDCOM HQ Jobs platform / employer / educator matches
        </div>
      </v-container>
    </v-img>
    <v-container>
      <v-card
        class="mt-5"
        outlined
      >
        <v-list>
          <template v-for="(match, matchIndex) in matches">
            <v-divider
              v-if="matchIndex > 0"
              :key="'divider/' + matchIndex"
              inset
            ></v-divider>
            <v-list-item
              :key="'educator/' + match.employer._id"
              @click="navigate('/employer/' + match.employer._id)"
            >
              <v-list-item-avatar>
                <v-img :src="match.employer.imageUrl || '/placeholder-employer.png'"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="match.employer.name" class="font-weight-bold">></v-list-item-title>
                <v-list-item-subtitle v-html="match.employer.bio"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="match.employer.city + ', ' + match.employer.state"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-group
              :value="false"
              :key="matchIndex"
              sub-group
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Educator matches</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list three-line>
                <template v-for="(educator, educatorIndex) in match.educators">
                  <v-divider
                    v-if="educatorIndex > 0"
                    :key="'divider/' + educator._id + '/' + educatorIndex"
                    inset
                  ></v-divider>
                  <v-list-item
                    :key="'educator/' + match.employer._id + '/' + educator._id"
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
            </v-list-group>

          </template>
        </v-list>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
  import Content from '@/content/pages/home.json';

  export default {
    components: {
    },
    data: function() {
      return {
        content: Content,
        matches: undefined
      }
    },
    computed: {
      isLoggedInEducator: function() {
        var storedEducator = this.$store.state.educator;
        return storedEducator !== null;
      }
    },
    mounted: async function() {
      if (this.isLoggedInEducator) {
        this.matches = await this.getMatches();
      }
    },
    methods: {
      async getMatches() {
        return fetch(this.$config.EDCOM_HQ_JOBS_API_BASE_URL + '/employers/matches', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.state.token },
          })
          .then((response) => { 
            if (response.status == 200) {
              return response.json()
              .then((responseJson) => {
                if (responseJson.isSuccess) {
                  return responseJson.matches;
                }
              })
            }
            return undefined;
          })
          .catch((error) => {
            console.error(error);
            return undefined;
          });
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
