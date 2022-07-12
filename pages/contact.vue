<template>
  <v-main>
    <v-container>
      <div class="text-h4 font-weight-bold mt-5">
        {{contactContent['Page Title Text']}}
      </div>
      <div class="red-bar"></div>
      <div class="text-h5 my-5">
        {{contactContent['Hero Description Text']}}
      </div>
      <v-img
        src="https://ggsc.s3.amazonaws.com/images/uploads/Our_Best_Education_Articles_of_2020.jpg"
        height="500px"
      ></v-img>
      <v-card class="py-8 px-8">
        <v-row
          justify="left"
          no-gutters
          class="text-left"
        >
          <v-col
            class="black--text font-weight-bold text-h5"
            cols="4"
          >
            {{contactContent['Hero Title Text']}}
          </v-col>
          <v-col
            class="black--text"
            cols="8"
          >
            <b>Email</b> | {{generalContent['Email Address']}}<br />
            <b>Phone</b> | {{generalContent['Phone Number']}}
          </v-col>
        </v-row>
        <div class="red-bar my-6 grey"></div>
        <v-row
          justify="center"
          no-gutters
        >
          <v-col
            class="black--text font-weight-bold text-h5"
            cols="4"
          >
            LOCATION
          </v-col>
          <v-col
            class=" black--text"
            cols="8"
          >
            {{generalContent['Address Line 1']}}<br />
            {{generalContent['Address Line 2']}}<br />
            {{generalContent['City']}}, {{generalContent['State']}} {{generalContent['Zipcode']}}
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
  import GeneralContent from '@/content/general.json';
  import ContactContent from '@/content/pages/contact.json';

  export default {
    components: {
    },
    data: function() {
      return {
        generalContent: GeneralContent,
        contactContent: ContactContent
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>