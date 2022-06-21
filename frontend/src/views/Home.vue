<template>
  <v-container class="home">
    <v-card>
      <v-btn v-if="!connected" @click="log">Click Me</v-btn>
      <v-btn v-else @click="log">{{ $store.state.ethers.address }}</v-btn>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
// import { ethers } from "ethers";

export default {
  name: "Home",
  components: {},
  computed: {
    connected() {
      return this.$store.state.ethers.connected;
    },
    wallet() {
      return this.$store.state.ethers.wallet;
    },
  },
  methods: {
    ...mapActions({ init: "ethers/init" }),
    async log() {
      console.log("Ready:", await this.init());
      console.log(this.$store.state.ethers);
    },
  },
};
</script>
