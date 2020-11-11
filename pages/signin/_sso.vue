<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mt-5">
              {{this.$route.params.sso}} SIGN IN
            </div>
            <div class="text-h6 font-weight-medium mt-2">
              <span class="darkgrey--text">Welcome back to the Educate ME platform! <b>Sign in</b> below:</span>
            </div>
            <div class="text-h7 font-weight-medium mt-2">
              <span class="darkgrey--text">Don't have an account yet? <nuxt-link to="/register">Register instead</nuxt-link>.</span>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <v-img
              class="graphic-image"
              src="/teacher-woman.jpg"
              contain
            />
          </v-col>
        </v-row>
        <v-btn outlined medium v-on:click="currentSignInType = signInTypes.EDUCATOR" class="font-weight-bold mt-8" color="grey">
          <span :class="currentSignInType == signInTypes.EDUCATOR ? 'black--text' : ''">Sign in as an educator <v-icon>mdi-briefcase-search</v-icon></span>
        </v-btn>
        <!--
        <v-btn outlined medium v-on:click="currentSignInType = signInTypes.EMPLOYER" class="font-weight-bold mt-8" color="grey">
          <span :class="currentSignInType == signInTypes.EMPLOYER ? 'black--text' : ''">Sign in as an employer/school <v-icon>mdi-account-search</v-icon></span>
        </v-btn>
        -->
        <v-card
          class="card d-block mt-4 pa-4"
          outlined
        >
          <v-form
            ref="form"
            v-show="!isProcessing"
            lazy-validation
          >
            <v-text-field
              v-model="emailAddress"
              :rules="emailAddressValidationRules"
              label="Email address"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordValidationRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              outlined
              dense
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn depressed @click="onSignInButtonClick" class="font-weight-bold" color="error" height="40">
              SignIn &nbsp;
              <v-icon>mdi-form</v-icon>
            </v-btn>
          </v-form>
          <v-progress-linear
            indeterminate
            color="error"
            v-show="isProcessing"
          ></v-progress-linear>
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
        signInTypes: {
          EDUCATOR: 'educator',
          EMPLOYER: 'employer'
        },
        currentSignInType: 'educator',
        emailAddress: undefined,
        password: undefined,
        showPassword: false,
        emailAddressValidationRules: [
          v => !!v || 'Email address is required',
          v => /.+@.+\..+/.test(v) || 'Email address must be valid',
        ],
        passwordValidationRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8 && v.length <= 100) || 'Password must within 8 to 100 characters in length',
        ],
        isProcessing: false
      }
    },
    methods: {
      async onSignInButtonClick() {
        if (this.$refs.form.validate()) {
          this.isProcessing = true;
          var response = await this.signIn();
          if (response) {
            if (response.isSuccess) {
              this.$store.commit('setToken', response.token);
              this.$store.commit('setEducator', response.educator);
              localStorage.setItem('TOKEN', response.token); // TODO: remove in use refresh_token flow
              if (this.$route.params.sso == 'bevy' && // Bevy login flow 
                  this.$route.query.redirect_url &&
                  response.ssoToken) {
                window.location.href = this.$route.query.redirect_url + "?sso_token=" + response.ssoToken + "&sso_auth_status=ok";
              } else { // Default/EducateME login flow
                this.$router.push({ path: '/educator/' + response.educator._id });
              }
            } else {
              window.alert(response.errorMessage);
              this.isProcessing = false;
            }
          } else {
            var errorMessage = "There was an error signing in." + " Please update entries and try again";
            window.alert(errorMessage);
            this.isProcessing = false;
          }
        }
        return false;
      },
      async signIn() {
        var body = {
          identityType: "educateme",
          userType: this.currentSignInType,
          emailAddress: this.emailAddress,
          password: this.password,
          ssoSource: this.$route.params.sso || 'educateme',
          ssoToken: this.$route.query.token
        };
        return fetch('http://api.educateme.wavelinkllc.com/educator/authenticate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
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
  .graphic-image {
    height: 200px;
  }

  .submit-button {
    width: 100%;
  }

  @media only screen and (min-width: 960px) {
    .card {
      width: 50%;
    }
  }

  @media only screen and (min-width: 1264px) {
    .container {
      width: 1264px;
    }
  }
</style>
