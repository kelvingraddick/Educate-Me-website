<template>
  <v-container>
    <div class="text-h4 font-weight-bold mt-5">
      EDCOM HQ Jobs is coming soon!
      <div class="red-bar"></div>
    </div>
    <v-layout class="mt-10 mb-10" row wrap>
      <v-flex xs12 md8>
        <div class="video">
          <iframe src="https://www.youtube.com/embed/7uUGBgCfEKQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <v-card class="mt-10">
          <v-card-title style="display: block;" primary-title>
            <div style="word-break: normal;" class="text-h5 font-weight-medium">
              {{content['About Section Description Text']}}
            </div>
            <div class="red-bar mt-3"></div>
          </v-card-title>
        </v-card>
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
  .video iframe {
    width: 100%;
    height: 360px;
  }

  @media only screen and (min-width: 960px) {
    .video iframe {
      width: 100%;
      height: 560px;
    }
  }
</style>
