<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mt-5">
              {{educator && educator.name && educator.name.first}} {{educator && educator.name && educator.name.last }}
            </div>
            <div v-if="isLoggedInEducator" class="text-h6 font-weight-medium mt-2">
              <span class="darkgrey--text">You are logged in as this <b>educator</b> (demo page)</span>
            </div>
          </v-col>
        </v-row>
        <v-card
          class="card d-block mt-4 pa-4"
          outlined
        >
					First name: {{educator && educator.name && educator.name.first}}<br />
					Last name: {{educator && educator.name && educator.name.last }}<br />
          Email Address: {{educator && educator.emailAddress }}<br />
          Phone Number: {{educator && educator.phoneNumber }}<br />
          Title: {{educator && educator.title }}<br />
          Bio: {{educator && educator.bio }}<br />
          <v-btn v-if="isLoggedInEducator" depressed @click="onLogoutButtonClick" class="font-weight-bold mt-4" color="error" height="40">
            Logout &nbsp;
            <v-icon>mdi-form</v-icon>
          </v-btn>
        </v-card>
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
      Authorize.trySignIn(this.$store);
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
        localStorage.removeItem('TOKEN'); // TODO: remove in use refresh_token flow
        this.$store.commit('setToken', undefined);
        this.$store.commit('setEducator', undefined);
        this.$router.push({ path: '/' });
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
