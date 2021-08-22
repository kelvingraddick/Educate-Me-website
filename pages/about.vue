<template>
  <v-container>
    <div class="text-h4 font-weight-bold mt-5">
      {{content['Page Title Text']}}
    </div>
    <v-layout class="mt-10 mb-10" row wrap>
      <v-flex xs12 md8>
        <div>
          <v-card>
            <v-img
              src="./about-educate-me.jpg"
            ></v-img>
            <v-card-title style="display: block;" primary-title>
              <div class="text-h4 font-weight-bold">
                {{content['About Section Title Text']}}
              </div>
              <div class="red-bar"></div>
              <div style="word-break: normal;" class="text-h5 font-weight-medium mt-3">
                {{content['About Section Description Text']}}
              </div>
            </v-card-title>
          </v-card>
        </div>
      </v-flex>
      <v-flex xs0 md4>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Content from '@/content/pages/about.json';

  export default {
    components: {
    },
    data: function() {
      return {
        content: Content
      }
    },
  }
</script>

<style lang="scss">
  
</style>
