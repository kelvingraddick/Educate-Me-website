<template>
  <v-main>
    <v-img
      src="/hero-2.jpg"
      class="hero-image"
      gradient="to top, rgba(255,255,255,.33), rgba(255,255,255,1)"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="8" class="d-flex flex-column justify-center">
            <div class="text-h5 font-weight-bold">
              {{content['Hero Sub-Title Text']}}
            </div>
            <div class="text-h3 font-weight-bold">
              {{content['Hero Title Text']}}
            </div>
          </v-col>
          <v-col cols="12" md="4" class="d-flex flex-column justify-center">
            <v-img
              src="/teachers-and-kids-graphic.png"
              class="graphic-image"
              contain
            />
          </v-col>
        </v-row>
        <div class="text-h6 font-weight-medium mt-2">
          <span class="darkgrey--text">Looking for a <b>position in education</b>? Let Educate ME help you find your dream school!</span>
        </div>
        <v-btn outlined medium v-on:click="currentSearchType = searchTypes.JOBS" class="font-weight-bold mt-3" color="grey">
          <span :class="currentSearchType == searchTypes.JOBS ? 'black--text' : ''">Find a job <v-icon>mdi-briefcase-search</v-icon></span>
        </v-btn>
        <v-btn outlined medium v-on:click="currentSearchType = searchTypes.CANDIDATES" class="font-weight-bold mt-3" color="grey">
          <span :class="currentSearchType == searchTypes.CANDIDATES ? 'black--text' : ''">Find a candidate <v-icon>mdi-account-search</v-icon></span>
        </v-btn>
        <v-card
          class="card d-block mt-2 px-2"
          outlined
          color="primary"
        >
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
        </v-card>
      </v-container>
    </v-img>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="d-flex flex-column justify-center">
          <v-img
            src="/woman-teacher.png"
            class="graphic-image"
            contain
          />
        </v-col>
        <v-col cols="12" md="8" class="d-flex flex-column justify-center">
          <div class="text-h4 font-weight-bold">
            WHO WE ARE
          </div>
          <div class="red-bar"></div>
          <div class="text-h5 font-weight-medium mt-3">
            <b>Educate ME</b> Foundation, Inc. is a social enterprise determined to increase the number of men and women of color in the field of education.<br />
            We seek to <b>change the education system</b> by creating a continuum for men and women of color to grow, achieve, and succeed from high school to career. 
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="gray-section">
      <v-col cols="12" md="12" class="d-flex flex-column justify-center">
        <v-container class="py-8">
          <div class="text-h4 font-weight-bold">
            OUR PROGRAMS
          </div>
          <div class="red-bar"></div>
          <div class="d-flex" style="width: 100%; overflow-x: scroll;">
            <v-card
              class="mt-10 mr-5"
              max-width="344"
              outlined
            >
              <v-img
                src="https://static.wixstatic.com/media/9a82e0_d3518165511f409fae41715c3f692753~mv2_d_4000_6000_s_4_2.jpg/v1/fill/w_1372,h_1300,al_c,q_85,usm_0.66_1.00_0.01/9a82e0_d3518165511f409fae41715c3f692753~mv2_d_4000_6000_s_4_2.jpg"
                height="200px"
              ></v-img>
              <v-card-title class="font-weight-bold">Educate ME University</v-card-title>
              <v-card-subtitle>
                Help us further our mission and spread educational opportunities at your university!
              </v-card-subtitle>
              <v-card-actions>
                <v-btn text>Apply / Learn More</v-btn>
              </v-card-actions>
            </v-card>
            <v-card
              class="mt-10 mr-5"
              max-width="344"
              outlined
            >
              <v-img
                src="https://static.wixstatic.com/media/9a82e0_56a41cad4f904f9c9aef6db13c1d5001~mv2.png/v1/fill/w_757,h_495,al_r/9a82e0_56a41cad4f904f9c9aef6db13c1d5001~mv2.png"
                height="200px"
              ></v-img>
              <v-card-title class="font-weight-bold">STEM Program</v-card-title>
              <v-card-subtitle>
                The Educate ME Foundation, Inc. an Indianapolis, Indiana based Social Enterprise, has partnered with national certification organizations to create an innovative education program designed to grow and diversify the K-12 STEM field.
              </v-card-subtitle>
              <v-card-actions>
                <v-btn text>Apply / Learn More</v-btn>
              </v-card-actions>
            </v-card>
            <v-card
              class="mt-10 mr-5"
              max-width="344"
              outlined
            >
              <v-img
                src="/baby.png"
                height="200px"
              ></v-img>
              <v-card-title class="font-weight-bold">Educate ME Early Fellowship</v-card-title>
              <v-card-subtitle>
                The Educate ME Foundation, Inc. an Indianapolis, Indiana based Social Enterprise, has partnered with Early Learning Indiana to create an innovative education program designed to grow and diversify the teacher talent pool in Early Childhood education in Indianapolis.
              </v-card-subtitle>
              <v-card-actions>
                <v-btn text>Apply / Learn More</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-container>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="py-8">
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <div class="text-h4 font-weight-bold">
            JOBS
          </div>
          <div class="red-bar"></div>
          <v-card
            class="mt-5"
            outlined
          >
            <v-list three-line>
              <template v-for="(job, index) in jobs">
                <v-divider
                  v-if="job.divider"
                  :key="index"
                  inset
                ></v-divider>
                <v-list-item
                  v-else
                  :key="job.id"
                  @click=""
                >
                  <v-list-item-avatar>
                    <v-img :src="job.imageUrl"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="job.title" class="font-weight-bold"></v-list-item-title>
                    <v-list-item-subtitle v-html="job.school"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="job.location"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <div class="text-h4 font-weight-bold">
            CANDIDATES
          </div>
          <div class="red-bar"></div>
          <v-card
            class="mt-5"
            outlined
          >
            <v-list three-line>
              <template v-for="(candidate, index) in candidates">
                <v-divider
                  v-if="candidate.divider"
                  :key="index"
                  inset
                ></v-divider>
                <v-list-item
                  v-else
                  :key="candidate.id"
                  @click=""
                >
                  <v-list-item-avatar>
                    <v-img :src="candidate.imageUrl"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="candidate.firstName + ' ' + candidate.lastName" class="font-weight-bold">></v-list-item-title>
                    <v-list-item-subtitle v-html="candidate.title"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="candidate.school + ' ' + candidate.location"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="gray-section">
      <v-col cols="12" md="12" class="d-flex flex-column justify-center">
        <v-container class="py-8">
          <div class="text-h4 font-weight-bold">
            GET IN TOUCH
          </div>
          <div class="red-bar"></div>
          <div class="text-h5 font-weight-medium mt-3">
            Contact us directly for any inquiries!
            <v-btn depressed next to="/contact" class="submit-button font-weight-bold mt-3" color="error" height="40">
              Contact Us &nbsp;
              <v-icon>mdi-phone</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-col>
    </v-row>
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
        searchTypes: {
          JOBS: 'jobs',
          CANDIDATES: 'candidates'
        },
        currentSearchType: 'jobs',
        searchCategories: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
        searchName: undefined,
        searchCategory: undefined,
        searchLocation: undefined,
        jobs: [
          {
            id: 1,
            imageUrl: 'https://www.educatemeleague.com/uploads/job/logo/32891806/thumb_allegiant.png',
            title: 'First Grade Teacher',
            school: 'Allegiant Prep',
            location: 'Indianapolis, IN'
          },
          { divider: true, inset: true },
          {
            id: 2,
            imageUrl: 'https://www.educatemeleague.com/uploads/job/logo/32891806/thumb_allegiant.png',
            title: 'Second Grade Teacher',
            school: 'Allegiant Prep',
            location: 'Indianapolis, IN'
          },
          { divider: true, inset: true },
          {
            id: 3,
            imageUrl: 'https://www.educatemeleague.com/uploads/job/logo/32891806/thumb_allegiant.png',
            title: 'Founding Third Grade Teacher',
            school: 'Allegiant Prep',
            location: 'Indianapolis, IN'
          }
        ],
        candidates: [
          {
            id: 1,
            imageUrl: 'https://www.educatemeleague.com/profiles/359421/view_image/27072390_10210197042194838_3357031736383747174_n.jpg',
            firstName: 'Samuel',
            lastName: 'Baker',
            title: 'Certified Teacher',
            school: 'Kipp Nashville College Prep Elementary',
            location: 'Nashville, TN'
          },
          { divider: true, inset: true },
          {
            id: 2,
            imageUrl: 'https://www.educatemeleague.com/profiles/354254/view_image/blake-nathan.jpg',
            firstName: 'Blake',
            lastName: 'Nathan',
            title: 'Technology Education Teacher',
            school: 'Stonybrook Middle School',
            location: 'Indianapolis, IN'
          },
          { divider: true, inset: true },
          {
            id: 3,
            imageUrl: 'https://www.educatemeleague.com/profiles/1072337/view_image/headshot.JPG',
            firstName: 'Lyric Campbell',
            lastName: 'Lyric Campbell',
            title: 'Supplemental Instructor',
            school: ' Fl Am University Developmental Studies Program',
            location: 'Tallahassee, FL'
          }
        ],
      }
    }
  }
</script>

<style lang="scss">
  .hero-image {
    height: auto;
  }

  .graphic-image {
    max-height: 400px;
  }
  
  .card {
    width: auto;
    height: auto;
  }

  .submit-button {
    width: 100%;
  }

  .red-bar {
    width: 50%;
    height: 5px;
    background-color: rgb(255, 82, 82);
    border-radius: 4px;
  }

  .gray-section {
    background-color: #f2f2f2;
  }

  @media only screen and (min-width: 960px) {
    .hero-image {
      height: 550px;
    }
    
    .card {
      width: 100%;
      height: 65px;
    }
  }

  @media only screen and (min-width: 1264px) {
    .container {
      width: 1264px;
    }

    .hero-image {
      height: 650px;
    }
  }
</style>
