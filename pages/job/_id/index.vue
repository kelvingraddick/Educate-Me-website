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
              <v-card-title class="text-h5 font-weight-bold">{{job && job.title}}</v-card-title>
              <v-card-text>
                <div class="h6 font-weight-bold">{{job && job.type}}</div>
                <div></div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="onLinkedInButtonClick"
                >
                  <v-icon>mdi-email</v-icon>&nbsp;Apply
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="onLinkedInButtonClick"
                >
                  <v-icon>mdi-linkedin</v-icon>&nbsp;LinkedIn
                </v-btn>
                 <v-btn
                  color="primary"
                  text
                  @click="onLinkedInButtonClick"
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
              <v-card-title class="">Description</v-card-title>
              <v-card-subtitle class="">{{job && job.description}}</v-card-subtitle>
              <v-card-title class="">Instructions</v-card-title>
              <v-card-subtitle class="">{{job && job.instructions}}</v-card-subtitle>
              <v-card-title class="">City</v-card-title>
              <v-card-subtitle class="">{{job && job.city}}</v-card-subtitle>
              <v-btn depressed @click="onApplyButtonClick" class="font-weight-bold ma-4" color="error" height="40">
                Apply &nbsp;
                <v-icon>mdi-form</v-icon>
              </v-btn>
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
        job: undefined
      }
    },
    computed: {
      userImageUrl: function() {
        var storedJob = this.$store.state.job;
        return (storedJob && storedJob.imageUrl) || '/placeholder-user.png';
      }
    },
    mounted: function() {
      Authorize.tryEmployerSignIn(this.$store);
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

      },
      async onLinkedInButtonClick() {

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
