<template>
  <v-app>
    <!--
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>HOLA MUNDO</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
  -->
    <v-main>
      <vtoast ref="vtoast"/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import vtoast from './components/vtoast.vue'

  export default {
    name: 'App',
    components: {
    vtoast
  },
    data: () => ({
      //
    }),
    mounted() {
    this.$root.vtoast = this.$refs.vtoast
    

    },
  };
</script>