<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card outlined>
              <v-img
                height="250"
                :src="(educator && educator.imageUrl) || '/placeholder-educator.png'"
              ></v-img>
              <v-card-title class="text-h5 font-weight-bold">{{educator && educator.name && educator.name.first}} {{educator && educator.name && educator.name.last }} {{ isLoggedInEducator ? '(You)' : ''}}</v-card-title>
              <v-card-text>
                <div class="h6 font-weight-bold">{{educator && educator.title}}</div>
                <div></div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="onShareButtonClick"
                >
                  <v-icon>mdi-file-document</v-icon>&nbsp;Share
                </v-btn>
                <!--
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
                -->
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card
              class="card d-block"
              outlined
            >
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-title class="">Bio</v-card-title>
                  <v-card-subtitle class="">{{educator && educator.bio}}</v-card-subtitle>
                  <v-card-title class="">Email Address</v-card-title>
                  <v-card-subtitle class="">{{educator && educator.emailAddress}}</v-card-subtitle>
                  <v-card-title class="">Phone Number</v-card-title>
                  <v-card-subtitle class="">{{educator && educator.phoneNumber}}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-title class="">Locations</v-card-title>
                  <v-card-subtitle class="">{{educator && educator.locations && educator.locations.join(', ')}}</v-card-subtitle>
                  <v-card-title class="">School Levels</v-card-title>
                  <v-card-subtitle class="">{{educator && educator.schoolLevels && educator.schoolLevels.join(', ')}}</v-card-subtitle>
                  <v-card-title class="">Certification Status</v-card-title>
                  <v-card-subtitle class="">{{educator && educator.certificationStatus}}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-card-actions v-if="isLoggedInEducator || isLoggedInAdmin" class="ma-2">
                <v-btn depressed @click="onEditButtonClick" class="font-weight-bold" color="primary" height="40">
                  Edit &nbsp;
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
                <v-btn depressed @click="onLogoutButtonClick" class="font-weight-bold" color="error" height="40">
                  Logout &nbsp;
                  <v-icon>mdi-door</v-icon>
                </v-btn>
                <v-btn text @click="onDeleteAccountButtonClick" class="font-weight-bold" color="error" height="40">
                  Delete account
                </v-btn>
                <v-dialog
                  v-model="isDeleteAccountDialogVisible"
                  width="500"
                >
                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Account Deletion
                    </v-card-title>
                    <v-card-text>
                      <br />Are you sure you want to delete the account?
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        text
                        @click="deleteAccount"
                      >
                        Yes (this is permanent!)
                      </v-btn>
                      <v-btn
                        text
                        @click="isDeleteAccountDialogVisible = false"
                      >
                        No
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
            <v-card
              v-if="isLoggedInEducator || isLoggedInAdmin"
              class="mt-5"
              outlined
            >
              <v-card-title class="">Job Matches</v-card-title>
              <v-list three-line>
                <template v-for="(job) in jobs">
                  <v-divider
                    v-if="job.divider"
                    :key="job.id + '-divider'"
                    inset
                  ></v-divider>
                  <v-list-item
                    v-else
                    :key="job.id"
                    @click="navigate('/job/' + job._id)"
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
        </v-row>
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
        educator: undefined,
        jobs: [],
        isDeleteAccountDialogVisible: false
      }
    },
    computed: {
      isLoggedInEducator: function() {
        var storedEducator = this.$store.state.educator;
        return storedEducator && storedEducator._id == this.educator?._id;
      },
      isLoggedInAdmin: function() {
        var storedEmployer = this.$store.state.employer;
        return storedEmployer && storedEmployer.isAdmin;
      }
    },
    mounted: async function() {
      if (this.isLoggedInEducator || this.isLoggedInAdmin) {
        this.jobs = await this.getJobs(this.educator?._id);
      }
    },
    watch: {
      async '$store.state.educator' (val) {
        if (this.isLoggedInEducator || this.isLoggedInAdmin) {
          this.jobs = await this.getJobs(this.educator?._id);
        }
      }
    },
		async asyncData({ $config, params }) {
      return fetch($config.EDCOM_HQ_JOBS_API_BASE_URL + '/educator/' + params.id, { method: 'GET' })
				.then((response) => { 
					if (response.status == 200) {
						return response.json()
						.then((responseJson) => {
							if (responseJson.isSuccess) {
								return { educator: responseJson.educator };
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
      async getJobs(educatorId) {
        return fetch(this.$config.EDCOM_HQ_JOBS_API_BASE_URL + '/educator/' + educatorId + '/jobs', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.state.token },
          })
          .then((response) => { 
            if (response.status == 200) {
              return response.json()
              .then((responseJson) => {
                if (responseJson.isSuccess) {
                  return responseJson.jobs;
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
      async deleteAccount() {
        fetch(this.$config.EDCOM_HQ_JOBS_API_BASE_URL + '/educator/' + this.educator?._id + '/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.state.token },
          })
          .then((response) => { 
            if (response.status == 200) {
              response.json()
              .then((responseJson) => {
                if (responseJson.isSuccess) {
                  window.alert("The account was successfully deleted.");
                  window.location = '/';
                } else {
                  window.alert("There was an error. Please try again.");
                }
              })
            } else {
              window.alert("There was an error. Please try again.");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },
      async onEditButtonClick() {
        this.$router.push({ path: '/educator/' + this.educator?._id + '/edit/' });
      },
      async onLogoutButtonClick() {
        localStorage.removeItem('TOKEN');
        this.$store.commit('setEducator', undefined);
        this.$store.commit('setEmployer', undefined);
        this.$router.push({ path: '/' });
      },
      async onDeleteAccountButtonClick() {
        this.isDeleteAccountDialogVisible = true;
      },
      async onShareButtonClick() {
        navigator.clipboard.writeText(window.location).then(function () {
          alert('Copied page to clipboard for sharing!');
        }, function(err) {
          alert('Failed to copy page to clipboard for sharing: ', err);
        });
      },
      async onLinkedInButtonClick() {

      },
      async navigate(path) {
        this.$router.push({ path: path });
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
