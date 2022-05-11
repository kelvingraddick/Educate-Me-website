<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card outlined>
              <v-img
                height="250"
                :src="(job && job.imageUrl) || '/placeholder-job.png'"
              ></v-img>
              <v-card-title class="text-h5 font-weight-bold">{{job && job.title}}</v-card-title>
              <v-card-text>
                <div class="h6 font-weight-bold">{{job && job.schoolLevel}} &middot; {{job && job.city}}, {{job && job.state}}</div>
                <div>{{job && job.employer && job.employer.name}}</div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="onApplyButtonClick"
                >
                  <v-icon>mdi-email</v-icon>&nbsp;Apply
                </v-btn>
                 <v-btn
                  color="primary"
                  text
                  @click="onShareButtonClick"
                >
                  <v-icon>mdi-file-document</v-icon>&nbsp;Share
                </v-btn>
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
                  <v-card-title class="">Description</v-card-title>
                  <v-card-subtitle class="">{{job && job.description}}</v-card-subtitle>
                  <v-card-title class="">Instructions</v-card-title>
                  <v-card-subtitle class="">{{job && job.instructions}}</v-card-subtitle>
                  <v-card-title class="">Certification Status</v-card-title>
                  <v-card-subtitle class="">{{job && job.certificationStatus}}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-title class="">Address</v-card-title>
                  <v-card-subtitle class="">
                    <v-content v-if="job && job.addressName">
                      {{job.addressName}}<br />
                    </v-content>
                    <v-content v-if="job && job.addressLine1">
                      {{job.addressLine1 + ','}}
                    </v-content>  
                    <v-content v-if="job && job.addressLine2">
                      {{job.addressLine2}}
                    </v-content>
                    {{job && job.city + ', ' + job.state + ' ' + job.zipCode}}
                  </v-card-subtitle>
                  <v-card-title class="">Location Type</v-card-title>
                  <v-card-subtitle class="">{{job && job.locationType}}</v-card-subtitle>
                  <v-card-title class="">School Type</v-card-title>
                  <v-card-subtitle class="">{{job && job.schoolType}}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-card-actions v-show="!isProcessing" class="ma-2">
                <v-btn depressed @click="onApplyButtonClick" class="font-weight-bold" color="primary" height="40">
                  Apply &nbsp;
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn v-if="isJobOwner" depressed @click="onEditButtonClick" class="font-weight-bold" color="primary" height="40">
                  Edit &nbsp;
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
                <v-btn v-if="isJobOwner" depressed @click="onDeleteButtonClick" class="font-weight-bold" color="error" height="40">
                  Delete &nbsp;
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
              <v-progress-linear
                indeterminate
                color="error"
                v-show="isProcessing"
              ></v-progress-linear>
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
        job: undefined,
        isProcessing: false
      }
    },
    computed: {
      isJobOwner: function() {
        var storedEmployer = this.$store.state.employer;
        return storedEmployer && storedEmployer._id == this.job?.employer._id;
      },
    },
    mounted: function() {

    },
		async asyncData({ params }) {
			return fetch('http://api.educateme.wavelinkllc.com/job/' + params.id, { method: 'GET' })
				.then((response) => { 
					if (response.status == 200) {
						return response.json()
						.then((responseJson) => {
							if (responseJson.isSuccess) {
								return { job: responseJson.job };
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
      async onApplyButtonClick() {
        window.open(this.job?.postingUrl, '_blank');
      },
      async onShareButtonClick() {

      },
      async onEditButtonClick() {
        this.$router.push({ path: '/job/' + this.job?._id + '/edit/' });
      },
      async onDeleteButtonClick() {
        this.isProcessing = true;
        var response = await this.delete();
        if (response) {
          if (response.isSuccess) {
            // success
            this.$router.push({ path: '/employer/' + this.$store.state.employer._id });
          } else {
            window.alert(response.errorMessage);
            this.isProcessing = false;
          }
        } else {
          var errorMessage = "There was an error deleting the job." + " Please update entries and try again";
          window.alert(errorMessage);
          this.isProcessing = false;
        }
      },
      async delete() {
        return fetch('http://api.educateme.wavelinkllc.com/job/delete/' + this.job._id, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.state.token },
        })
        .then((response) => { 
          if (response.status == 200) {
            return response.json()
            .then((responseJson) => {
              return responseJson;
            })
          } else {
            return undefined;
          }
        })
        .catch((error) => {
          console.error(error);
          return undefined;
        });
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
