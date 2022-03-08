<template>
  <v-main>
    <v-img
      src="/hero-2.jpg"
      class="hero-image"
      gradient="to top, rgba(255,255,255,.33), rgba(255,255,255,1)"
    >
      <v-container>
        <div class="text-h4 font-weight-bold mt-5">
          ADMIN / MATCHES
        </div>
        <div class="red-bar"></div>
        <div class="text-h5 mt-5">
          Administor over the EducateME platform / matches
        </div>
      </v-container>
    </v-img>
    <v-container>
      <v-card
        class="mt-5"
        outlined
      >
        <v-list three-line>
          <template v-for="(match, index) in matches">
            <v-divider
              v-if="index > 0"
              :key="index"
              inset
            ></v-divider>
            <v-list-item
              :key="match.educator._id"
              @click="navigate('/educator/' + match.educator._id)"
            >
              <v-list-item-avatar>
                <v-img :src="match.educator.imageUrl || '/placeholder-user.png'"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="match.educator.name && (match.educator.name.first + ' ' + match.educator.name.last)" class="font-weight-bold">></v-list-item-title>
                <v-list-item-subtitle v-html="match.educator.title"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="(match.educator.locations && match.educator.locations[0]) || ''"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-group
              :value="true"
              :key="index"
              sub-group
            >
            <template v-slot:activator>
              <v-list-item-title>Matches</v-list-item-title>
            </template>
              <v-list three-line>
                <template v-for="(job, index) in match.jobs">
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
                      <v-img :src="job.imageUrl || '/placeholder-user.png'"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="job.title" class="font-weight-bold">></v-list-item-title>
                      <v-list-item-subtitle v-html="job.type"></v-list-item-subtitle>
                      <v-list-item-subtitle v-html="(job.categories && job.categories[0]) || ''"></v-list-item-subtitle>
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
  import Authorize from '@/helpers/authorize.js';

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
      await Authorize.tryEducatorSignIn(this.$store);
      if (this.isLoggedInEducator) {
        this.matches = await this.getMatches();
      }
    },
    methods: {
      async getMatches() {
        return fetch('http://api.educateme.wavelinkllc.com/educators/matches', {
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
