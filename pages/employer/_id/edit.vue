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
            <v-btn depressed @click="onSaveButtonClick" class="font-weight-bold" color="error" height="40">
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
  import S3 from 'aws-s3';

  export default {
    components: {
    },
    data: function() {
      return {
        content: Content,
        employer: undefined,
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
        isProcessing: false
      }
    },
    async asyncData({ $config, params }) {
			return fetch($config.EDCOM_HQ_JOBS_API_BASE_URL + '/employer/' + params.id, { method: 'GET' })
				.then((response) => { 
					if (response.status == 200) {
						return response.json()
						.then((responseJson) => {
							if (responseJson.isSuccess) {
								return { employer: responseJson.employer };
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
      async onSaveButtonClick() {
        if (this.$refs.form.validate()) {
          this.isProcessing = true;
          var response = await this.save();
          if (response) {
            if (response.isSuccess) {
              this.$store.commit('setEmployer', response.employer);
              this.$store.commit('setEducator', undefined);
              this.$router.push({ path: '/employer/' + response.employer._id });
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
        var body = this.employer;
        return fetch(this.$config.EDCOM_HQ_JOBS_API_BASE_URL + '/employer/' + this.employer._id + '/update/', {
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
