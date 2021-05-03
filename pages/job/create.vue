<template>
  <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <div class="text-h4 font-weight-bold mt-5">
              CREATE JOB
            </div>
            <div class="text-h6 font-weight-medium mt-2">
              <span class="darkgrey--text"><b>Fill out the form below</b> to add a new job</span>
            </div>
            <div class="text-h7 font-weight-medium mt-2">
              <span class="darkgrey--text">Already created the job? <nuxt-link to="/jobs">Edit instead</nuxt-link>.</span><br />
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
              label="Address Name"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="job.addressLine1"
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
            <v-text-field
              v-model="job.city"
              label="City"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="job.state"
              label="State"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="job.zipCode"
              label="ZipCode"
              outlined
              dense
            ></v-text-field>
            <v-btn depressed @click="onCreateButtonClick" class="font-weight-bold" color="error" height="40">
              Create &nbsp;
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
        job: {
          type: 'Full-time',
          title: undefined,
          description: undefined,
          instructions: undefined,
          addressName: undefined,
          addressLine1: undefined,
          addressLine2: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
          imageUrl: undefined,
          categories: ["teacher"]
        },
        showPassword: false,
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
        isProcessing: false
      }
    },
    methods: {
      async onCreateButtonClick() {
        if (this.$refs.form.validate()) {
          this.isProcessing = true;
          var response = await this.create();
          if (response) {
            if (response.isSuccess) {
              // success
              this.$router.push({ path: '/employer/' + this.$store.employer._id });
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
      async create() {
        var body = this.job;
        return fetch('http://api.educateme.wavelinkllc.com/job/create', {
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
