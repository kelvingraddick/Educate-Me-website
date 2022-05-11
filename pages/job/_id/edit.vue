<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mt-5">
              EDIT JOB
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
              <v-img :src="job.imageUrl || '/placeholder-job.png'" />
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
              v-model="job.title"
              :rules="titleValidationRules"
              label="Title"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="job.description"
              :rules="descriptionValidationRules"
              label="Description"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="job.instructions"
              :rules="instructionsValidationRules"
              label="Instructions"
              outlined
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="job.addressName"
              :rules="addressNameValidationRules"
              label="Address Name"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="job.addressLine1"
              :rules="addressLine1ValidationRules"
              label="Address Line 1"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="job.addressLine2"
              label="Address Line 2"
              outlined
              dense
            ></v-text-field>
            <v-autocomplete
              v-model="job.city"
              :items="cities"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="City"
            ></v-autocomplete>
            <v-autocomplete
              v-model="job.state"
              :items="states"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="State"
            ></v-autocomplete>
            <v-text-field
              v-model="job.zipCode"
              :rules="zipCodeValidationRules"
              label="ZipCode"
              outlined
              dense
              required
            ></v-text-field>
            <v-autocomplete
              v-model="job.locationType"
              :items="locationTypes"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="Location type"
            ></v-autocomplete>
            <v-text-field
              v-model="job.postingUrl"
              :rules="postingUrlValidationRules"
              label="Job Posting URL"
              outlined
              dense
              required
            ></v-text-field>
            <v-autocomplete
              v-model="job.schoolType"
              :items="schoolTypes"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="School type"
            ></v-autocomplete>
            <v-autocomplete
              v-model="job.schoolLevel"
              :items="schoolLevels"
              :rules="requiredRules"
              outlined
              dense
              chips
              small-chips
              label="School level"
            ></v-autocomplete>
            <v-autocomplete
              v-model="job.certificationStatus"
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
  import LocationTypes from '@/constants/location-types.js';
  import SchoolLevels from '@/constants/school-levels.js';
  import SchoolTypes from '@/constants/school-types.js';
  import S3 from 'aws-s3';

  export default {
    components: {
    },
    props: {
    },
    data: function() {
      return {
        content: Content,
        job: undefined,
        certificationStatus: CertificationStatus,
        cities: CitiesStates.map((x) => x.city),
        states: CitiesStates.map((x) => x.state),
        locationTypes: LocationTypes,
        schoolLevels: SchoolLevels,
        schoolTypes: SchoolTypes,
        requiredRules: [
          v => !!v || 'This field is required.',
          v => (v && v.length > 0) || 'This field is required.',
        ],
        imageValidationRules: [
          v => !v || v.size < 50000000 || 'Image size should be less than 50 MB!',
        ],
        titleValidationRules: [
          v => !!v || 'Title is required',
          v => (v && v.length < 50) || 'Title must be no greater than 50 characters',
        ],
        descriptionValidationRules: [
          v => !!v || 'Description is required',
          v => (v && v.length < 5000) || 'Description must be no greater than 5000 characters',
        ],
        instructionsValidationRules: [
          v => !!v || 'Instructions are required',
          v => (v && v.length < 5000) || 'Instructions must be no greater than 5000 characters',
        ],
        addressNameValidationRules: [
          v => !!v || 'Address Name is required',
          v => (v && v.length < 50) || 'Address Name must be no greater than 50 characters',
        ],
        addressLine1ValidationRules: [
          v => !!v || 'Address Line 1 is required',
          v => (v && v.length < 50) || 'Address Line 1 must be no greater than 50 characters',
        ],
        zipCodeValidationRules: [
          v => !!v || 'Zip Code is required',
          v => (v && v.length == 5) || 'Zip Code must be 5 characters',
        ],
        postingUrlValidationRules: [
          v => !!v || 'Posting URL is required',
          v => (v && v.length < 5000) || 'Posting URL must be no greater than 5000 characters',
        ],
        isProcessing: false
      }
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
      async onChooseImage(file) {
        if (file) {
          const config = {
            bucketName: 'wavelink-educateme',
            dirName: 'images/job',
            region: 'us-east-1',
            accessKeyId: this.$config.AWS_ACCESS_KEY_ID,
            secretAccessKey: this.$config.AWS_ACCESS_KEY_SECRET,
            s3Url: 'https://wavelink-educateme.s3.amazonaws.com'
          };
          const fileName = 'job.' + Date.now() + '.' + Math.round(Math.random() * 1E9);
          const S3Client = new S3(config);
          S3Client
            .uploadFile(file, fileName)
            .then(data => {
              this.job.imageUrl = data.location;
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
              // success
              this.$router.push({ path: '/job/' + response.job._id });
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
        var body = this.job;
        return fetch('http://api.educateme.wavelinkllc.com/job/update/' + this.job._id, {
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
