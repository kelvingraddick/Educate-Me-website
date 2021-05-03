<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card outlined>
              <v-img
                height="250"
                :src="userImageUrl"
              ></v-img>
              <v-card-title class="text-h5 font-weight-bold">{{employer && employer.name}} {{ isLoggedInEmployer ? '(You)' : ''}}</v-card-title>
              <v-card-text>
                <div class="h6 font-weight-bold">{{employer && employer.website}}</div>
                <div></div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="onLinkedInButtonClick"
                >
                  <v-icon>mdi-email</v-icon>&nbsp;Contact
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="onLinkedInButtonClick"
                >
                  <v-icon>mdi-file-document</v-icon>&nbsp;Resume
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="onLinkedInButtonClick"
                >
                  <v-icon>mdi-linkedin</v-icon>&nbsp;LinkedIn
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card
              class="card d-block"
              outlined
            >
              <v-card-title class="">Bio</v-card-title>
              <v-card-subtitle class="">{{employer && employer.bio}}</v-card-subtitle>
              <v-card-title class="">Email Address</v-card-title>
              <v-card-subtitle class="">{{employer && employer.emailAddress}}</v-card-subtitle>
              <v-card-title class="">Phone Number</v-card-title>
              <v-card-subtitle class="">{{employer && employer.phoneNumber}}</v-card-subtitle>
              <v-card-actions v-if="isLoggedInEmployer" class="ma-2">
                <v-btn depressed @click="onEditButtonClick" class="font-weight-bold" color="primary" height="40">
                  Edit &nbsp;
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
                <v-btn depressed @click="onLogoutButtonClick" class="font-weight-bold" color="error" height="40">
                  Logout &nbsp;
                  <v-icon>mdi-door</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card
              class="mt-5"
              outlined
            >
              <v-card-title class="">Jobs</v-card-title>
              <v-list three-line>
                <template v-for="(job, index) in employer.jobs">
                  <v-divider
                    v-if="index > 0"
                    :key="index"
                    inset
                  ></v-divider>
                  <v-list-item
                    :key="job._id"
                    @click="onJobClick(job._id)"
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
              <v-card-actions class="ma-2">
                <v-btn depressed @click="onAddJobButtonClick" class="font-weight-bold" color="primary" height="40">
                  Add a job &nbsp;
                  <v-icon>mdi-suitcase</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-main>
</template>

<script>
  import Content from '@/content/pages/home.json';
  import Authorize from '@/helpers/authorize.js'

  export default {
    components: {
		},
    data: function() {
      return {
        content: Content,
        employer: undefined
      }
    },
    computed: {
      isLoggedInEmployer: function() {
        var storedEmployer = this.$store.state.employer;
        return storedEmployer && storedEmployer._id == this.employer?._id;
      },
      userImageUrl: function() {
        var storedEmployer = this.$store.state.employer;
        return (storedEmployer && storedEmployer.imageUrl) || '/placeholder-user.png';
      }
    },
    mounted: function() {
      Authorize.tryEmployerSignIn(this.$store);
    },
		async asyncData({ params }) {
			return fetch('http://api.educateme.wavelinkllc.com/employer/' + params.id, { method: 'GET' })
				.then((response) => { 
					if (response.status == 200) {
						return response.json()
						.then((responseJson) => {
							if (responseJson.isSuccess) {
								return { employer: responseJson.employer };
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
    methods: {
      async onEditButtonClick() {
        this.$router.push({ path: '/employer/' + this.employer?._id + '/edit/' });
      },
      async onAddJobButtonClick() {
        this.$router.push({ path: '/job/create/' });
      },
      async onLogoutButtonClick() {
        localStorage.removeItem('TOKEN');
        this.$store.commit('setToken', undefined);
        this.$store.commit('setEmployer', undefined);
        this.$store.commit('setEducator', undefined);
        this.$router.push({ path: '/' });
      },
      async onLinkedInButtonClick() {

      },
      async onJobClick(id) {
        this.$router.push({ path: '/job/' + id });
      }
    }
  }
</script>

<style lang="scss" scoped>

  @media only screen and (min-width: 960px) {

  }

  @media only screen and (min-width: 1264px) {
    .container {
      width: 1264px;
    }
  }
</style>
