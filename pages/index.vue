<template>
    <v-img
      src="/hero-1.jpg"
      gradient="to top, rgba(255,255,255,.33), rgba(255,255,255,1)"
    >
      <v-container>
        <div class="text-h5 font-weight-bold mt-15">
          Changing education | Answering the cry for help
        </div>
        <div class="text-h3 font-weight-bold">
          EDUCATED MINORITIES EDUCATING
        </div>
        <div class="text-h6 font-weight-medium mt-15">
          <span class="darkgrey--text">Looking for a <b>position in education</b>? Let Educate ME help you find your dream school!</span>
        </div>
        <v-btn text small v-on:click="currentSearchType = searchTypes.JOBS" class="font-weight-bold mt-3" color="grey">
          <span :class="currentSearchType == searchTypes.JOBS ? 'black--text' : ''">Find a job <v-icon>mdi-briefcase-search</v-icon></span>
        </v-btn>
        <v-btn text small v-on:click="currentSearchType = searchTypes.CANDIDATES" class="font-weight-bold mt-3" color="grey">
          <span :class="currentSearchType == searchTypes.CANDIDATES ? 'black--text' : ''">Find a candidate <v-icon>mdi-account-search</v-icon></span>
        </v-btn>
        <v-card
          class="card d-block mt-2"
          outlined
          color="primary"
        >
          <v-container>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="searchName"
                  label="Name"
                  color="white"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  :items="searchCategories"
                  v-model="searchCategory"
                  label="Category"
                  color="white"
                  outlined
                  dense
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="searchLocation"
                  label="Location"
                  color="white"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn depressed next :to="'/' + currentSearchType" class="submit-button font-weight-bold" color="error" height="40">
                  Search &nbsp;
                  <v-icon>mdi-database-search</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-img>
</template>

<script>
  export default {
    components: {
    },
    data: function() {
      return {
        searchTypes: {
          JOBS: 'jobs',
          CANDIDATES: 'candidates'
        },
        currentSearchType: 'jobs',
        searchCategories: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
        searchName: undefined,
        searchCategory: undefined,
        searchLocation: undefined
      }
    }
  }
</script>

<style lang="scss">
  .card {
    width: auto;
    height: 90px;
  }

  .submit-button {
    width: 100%;
  }

  @media only screen and (max-width: 900px) {
    .card {
      width: 100%;
      height: auto;
    }
  }
</style>
