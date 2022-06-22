<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mt-5">
              EDIT
            </div>
            <div class="text-h6 font-weight-medium mt-2">
              <span class="darkgrey--text"><b>Edit the fields below</b> and hit the Save button to make changes to your account.</span>
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
              <v-img :src="educator.imageUrl || '/placeholder-educator.png'" />
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
              v-model="educator.name.first"
              :rules="nameValidationRules"
              label="First name"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="educator.name.last"
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
            <v-autocomplete
              v-model="educator.gender"
              :items="genders"
              outlined
              dense
              chips
              small-chips
              label="Gender"
            ></v-autocomplete>
            <v-autocomplete
              v-model="educator.race"
              :items="races"
              outlined
              dense
              chips
              small-chips
              label="Race"
            ></v-autocomplete>
            <v-autocomplete
              v-model="educator.locations"
              :items="citiesStates"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="Locations"
              multiple
            ></v-autocomplete>
            <v-autocomplete
              v-model="educator.locationTypes"
              :items="locationTypes"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="Location types"
              multiple
            ></v-autocomplete>
            <v-autocomplete
              v-model="educator.schoolTypes"
              :items="schoolTypes"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="School types"
              multiple
            ></v-autocomplete>
            <v-autocomplete
              v-model="educator.schoolLevels"
              :items="schoolLevels"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="School levels"
              multiple
            ></v-autocomplete>
            <v-autocomplete
              v-model="educator.certificationStatus"
              :items="certificationStatus"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="Certification status"
            ></v-autocomplete>
            <v-btn depressed @click="onSaveButtonClick" class="font-weight-bold" color="primary" height="40">
              Save &nbsp;
              <v-icon>mdi-check</v-icon>
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
  import CertificationStatus from '@/constants/certification-status.js';
  import CitiesStates from '@/constants/cities-states.js';
  import Genders from '@/constants/genders.js';
  import LocationTypes from '@/constants/location-types.js';
  import Races from '@/constants/races.js';
  import SchoolLevels from '@/constants/school-levels.js';
  import SchoolTypes from '@/constants/school-types.js';
  import S3 from 'aws-s3';

  export default {
    components: {
    },
    data: function() {
      return {
        content: Content,
        educator: { name: {} },
        certificationStatus: CertificationStatus,
        citiesStates: CitiesStates.map((x) => x.city + ', ' + x.state),
        genders: Genders,
        locationTypes: LocationTypes,
        races: Races,
        schoolLevels: SchoolLevels,
        schoolTypes: SchoolTypes,
        requiredRules: [
          v => !!v || 'This field is required.',
          v => (v && v.length > 0) || 'This field is required.',
        ],
        imageValidationRules: [
          v => !v || v.size < 50000000 || 'Image size should be less than 50 MB!',
        ],
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
        isProcessing: false
      }
    },
    async asyncData({ $config, params }) {
			return fetch($config.EDCOM_HQ_JOBS_API_BASE_URL + '/educator/' + params.id, { method: 'GET' })
				.then((response) => { 
					if (response.status == 200) {
						return response.json()
						.then((responseJson) => {
							if (responseJson.isSuccess) {
								return { educator: { ...{ name: {} }, ...responseJson.educator } };
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
      async onChooseImage(file) {
        if (file) {
          const config = {
            bucketName: 'wavelink-educateme',
            dirName: 'images/educator',
            region: 'us-east-1',
            accessKeyId: this.$config.AWS_ACCESS_KEY_ID,
            secretAccessKey: this.$config.AWS_ACCESS_KEY_SECRET,
            s3Url: 'https://wavelink-educateme.s3.amazonaws.com'
          };
          const fileName = 'educator.' + Date.now() + '.' + Math.round(Math.random() * 1E9);
          const S3Client = new S3(config);
          S3Client
            .uploadFile(file, fileName)
            .then(data => {
              this.educator.imageUrl = data.location;
            })
            .catch(error => {
              console.error('Failed to upload image to S3');
              console.error(error);
            });
        }
      },
      async onSaveButtonClick() {
        if (this.$refs.form.validate()) {
          this.isProcessing = true;
          var response = await this.save();
          if (response) {
            if (response.isSuccess) {
              this.$store.commit('setEducator', response.educator);
              this.$store.commit('setEmployer', undefined);
              this.$router.push({ path: '/educator/' + response.educator._id });
            } else {
              window.alert(response.errorMessage);
              this.isProcessing = false;
            }
          } else {
            var errorMessage = "There was an error saving." + " Please update entries and try again";
            window.alert(errorMessage);
            this.isProcessing = false;
          }
        }
        return false;
      },
      async save() {
        var body = this.educator;
        return fetch(this.$config.EDCOM_HQ_JOBS_API_BASE_URL + '/educator/' + this.educator._id + '/update/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.$store.state.token },
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
