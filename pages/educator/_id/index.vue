<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card outlined>
              <v-img
                height="250"
                :src="educator.imageUrl || '/placeholder-user.png'"
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
              <v-card-subtitle class="">{{educator && educator.bio}}</v-card-subtitle>
              <v-card-title class="">Email Address</v-card-title>
              <v-card-subtitle class="">{{educator && educator.emailAddress}}</v-card-subtitle>
              <v-card-title class="">Phone Number</v-card-title>
              <v-card-subtitle class="">{{educator && educator.phoneNumber}}</v-card-subtitle>
              <v-btn v-if="isLoggedInEducator" depressed @click="onLogoutButtonClick" class="font-weight-bold ma-4" color="error" height="40">
                Logout &nbsp;
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
        educator: undefined
      }
    },
    computed: {
      isLoggedInEducator: function() {
        var storedEducator = this.$store.state.educator;
        return storedEducator && storedEducator._id == this.educator?._id;
      }
    },
    mounted: function() {
      Authorize.tryEducatorSignIn(this.$store);
    },
		async asyncData({ params }) {
			return fetch('http://api.educateme.wavelinkllc.com/educator/' + params.id, { method: 'GET' })
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
      async onLogoutButtonClick() {
        localStorage.removeItem('TOKEN');
        this.$store.commit('setEducator', undefined);
        this.$store.commit('setEmployer', undefined);
        this.$router.push({ path: '/' });
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
