<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mt-5">
              REGISTER
            </div>
            <div class="text-h6 font-weight-medium mt-2">
              <span class="darkgrey--text">Welcome to the EDCOM HQ Jobs platform! <b>Fill out the form below</b> to register as an employer</span>
            </div>
            <div class="text-h7 font-weight-medium mt-2">
              <span class="darkgrey--text">Already have an account? <nuxt-link to="/signin/employer">Sign in instead</nuxt-link>.</span><br />
              <span class="darkgrey--text">Are you an educator? <nuxt-link to="/register/educator">Register as an educator instead</nuxt-link>.</span>
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
            <v-list-item-avatar height="100" width="100" class="mb-6">
              <v-img :src="employer.imageUrl || '/placeholder-employer.png'" />
            </v-list-item-avatar>
            <v-file-input
              @change="onChooseImage"
              :rules="imageValidationRules"
              accept="image/*"
              placeholder="Select an image"
              :prepend-icon="null"
              append-icon="mdi-camera"
              label="Image"
              outlined
              dense
            ></v-file-input>
            <v-text-field
              v-model="employer.name"
              :rules="nameValidationRules"
              label="Name"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="employer.emailAddress"
              :rules="emailAddressValidationRules"
              label="Email address"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="employer.phoneNumber"
              :rules="phoneNumberValidationRules"
              label="Phone number"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="employer.password"
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
              v-model="employer.website"
              label="Website"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="employer.addressLine1"
              label="Address (line 1)"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="employer.addressLine2"
              label="Address (line 2)"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="employer.city"
              label="City"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="employer.state"
              label="State"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="employer.zipCode"
              label="Zip code"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="employer.bio"
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
  import S3 from 'aws-s3';

  export default {
    components: {
    },
    props: {
    },
    data: function() {
      return {
        content: Content,
        employer: {
          name: undefined,
          emailAddress: undefined,
          phoneNumber: undefined,
          password: undefined,
          website: undefined,
          addressLine1: undefined,
          addressLine2: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
          bio: undefined,
          imageUrl: undefined
        },
        showPassword: false,
        imageValidationRules: [
          v => !v || v.size < 50000000 || 'Image size should be less than 50 MB!',
        ],
        nameValidationRules: [
          v => !!v || 'Name is required',
          v => (v && v.length < 50) || 'Names must be no greater than 50 characters',
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
      async onChooseImage(file) {
        if (file) {
          const config = {
            bucketName: 'wavelink-educateme',
            dirName: 'images/employer',
            region: 'us-east-1',
            accessKeyId: this.$config.AWS_ACCESS_KEY_ID,
            secretAccessKey: this.$config.AWS_ACCESS_KEY_SECRET,
            s3Url: 'https://wavelink-educateme.s3.amazonaws.com'
          };
          const fileName = 'employer.' + Date.now() + '.' + Math.round(Math.random() * 1E9);
          const S3Client = new S3(config);
          S3Client
            .uploadFile(file, fileName)
            .then(data => {
              this.employer.imageUrl = data.location;
            })
            .catch(error => {
              console.error('Failed to upload image to S3');
              console.error(error);
            });
        }
      },
      async onRegisterButtonClick() {
        if (this.$refs.form.validate()) {
          this.isProcessing = true;
          var response = await this.register();
          if (response) {
            if (response.isSuccess) {
              this.$store.commit('setToken', response.token);
              this.$store.commit('setEmployer', response.employer);
              this.$store.commit('setEducator', undefined);
              localStorage.setItem('TOKEN', response.token);
              this.$router.push({ path: '/employer/' + response.employer._id });
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
        var body = this.employer;
        return fetch('https://api.edcomjobs.com/employer/register', {
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
