<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn icon link to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-btn v-if="!$store.state.ethers.connected" @click="init()">
        Connect Wallet
      </v-btn>
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
