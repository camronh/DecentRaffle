<template>
  <v-container class="home">
    <v-card>
      <UserRaffles />
      <!-- <v-btn v-if="!connected" @click="log">Click Me</v-btn> -->
      <!-- <v-btn v-else @click="log">{{ $store.state.ethers.address }}</v-btn> -->
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
// import { ethers } from "ethers";
// import airnodeProtocol from "@api3/airnode-protocol";
import UserRaffles from "../components/UserRaffles.vue"

export default {
  name: "Home",
  components: {
    UserRaffles
  },
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
      const airnodeProtocol = require("@api3/airnode-protocol");
      console.log("Ready:", await this.init());
      console.log(this.$store.state.ethers);
      const address = airnodeProtocol.AirnodeRrpAddresses["3"];
      console.log({ address });
      console.log(
        airnodeProtocol.AirnodeRrpV0Factory.connect(address, this.wallet)
      );
    },
  },
};
</script>
