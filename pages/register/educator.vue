<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mt-5">
              REGISTER
            </div>
            <div class="text-h6 font-weight-medium mt-2">
              <span class="darkgrey--text">Welcome to the Educate ME platform! <b>Fill out the form below</b> to register as an eductor</span>
            </div>
            <div class="text-h7 font-weight-medium mt-2">
              <span class="darkgrey--text">Already have an account? <nuxt-link to="/signin/educator">Sign in instead</nuxt-link>.</span><br />
              <span class="darkgrey--text">Are you an employer? <nuxt-link to="/register/employer">Register as an employer instead</nuxt-link>.</span>
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
              v-model="educator.firstName"
              :rules="nameValidationRules"
              label="First name"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="educator.lastName"
              :rules="nameValidationRules"
              label="Last name"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="educator.emailAddress"
              :rules="emailAddressValidationRules"
              label="Email address"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="educator.phoneNumber"
              :rules="phoneNumberValidationRules"
              label="Phone number"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="educator.password"
              :rules="passwordValidationRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              outlined
              dense
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="educator.title"
              label="Title"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="educator.bio"
              label="Bio"
              outlined
              dense
            ></v-text-field>
            <v-btn depressed @click="onRegisterButtonClick" class="font-weight-bold" color="error" height="40">
              Register &nbsp;
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
    props: {
      registrationType: String
    },
    data: function() {
      return {
        content: Content,
        educator: {
          firstName: undefined,
          lastName: undefined,
          emailAddress: undefined,
          phoneNumber: undefined,
          password: undefined,
          title: undefined,
          bio: undefined,
          imageUrl: undefined
        },
        showPassword: false,
        nameValidationRules: [
          v => !!v || 'First and last names are required',
          v => (v && v.length < 10) || 'First and last names must be no greater than 10 characters each',
        ],
        emailAddressValidationRules: [
          v => !!v || 'Email address is required',
          v => /.+@.+\..+/.test(v) || 'Email address must be valid',
        ],
        phoneNumberValidationRules: [
          v => (!v || (v.length >= 10 && v.length <= 11)) || 'Password must within 10 to 11 characters in length',
          v => (!v || Number.isInteger(Number(v))) || "The value must be an integer number"
        ],
        passwordValidationRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8 && v.length <= 100) || 'Password must within 8 to 100 characters in length',
        ],
        isProcessing: false
      }
    },
    methods: {
      async onRegisterButtonClick() {
        if (this.$refs.form.validate()) {
          this.isProcessing = true;
          var response = await this.register();
          if (response) {
            if (response.isSuccess) {
              this.$store.commit('setToken', response.token);
              this.$store.commit('setEducator', response.educator);
              this.$store.commit('setEmployer', undefined);
              localStorage.setItem('TOKEN', response.token);
              this.$router.push({ path: '/educator/' + response.educator._id });
            } else {
              window.alert(response.errorMessage);
              this.isProcessing = false;
            }
          } else {
            var errorMessage = "There was an error signing up." + " Please update entries and try again";
            window.alert(errorMessage);
            this.isProcessing = false;
          }
        }
        return false;
      },
      async register() {
        var body = this.educator;
        return fetch('http://api.educateme.wavelinkllc.com/educator/register', {
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
