<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn icon link to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- TODO: #4 Info Dialog -->
    </v-app-bar>

    <v-main>
      <v-container
        align="center"
        justify="center"
        v-if="!$store.state.ethers.connected"
      >
        <br />
        <!-- TODO: #2 Center this -->
        <v-btn outlined @click="init()"> Connect Wallet </v-btn>
      </v-container>

      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    ...mapActions({ init: "ethers/init" }),
  },
};
</script>
