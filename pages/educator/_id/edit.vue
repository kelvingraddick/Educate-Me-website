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

  export default {
    components: {
    },
    data: function() {
      return {
        content: Content,
        educator: undefined,
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
        var body = {
          firstName: this.educator.name.first,
          lastName: this.educator.name.last,
          emailAddress: this.educator.emailAddress,
          phoneNumber: this.educator.phoneNumber,
          title: this.educator.title,
          bio: this.educator.bio,
          imageUrl: this.educator.imageUrl
        };
        return fetch('http://api.educateme.wavelinkllc.com/educator/' + this.educator._id + '/update/', {
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
