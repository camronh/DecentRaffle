<template>
  <v-card outlined height="100%">
    <v-card-title>Winners</v-card-title>
    <v-card-text v-if="!raffle.open && !raffle.airnodeSuccess">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="100"
        ></v-progress-circular>
        <br />
        <br />
        <p>
          <b>Waiting for Airnode...</b>
        </p>
      </div>
    </v-card-text>
    <v-card-text v-else>
      <v-virtual-scroll
        benched
        :items="raffle.winners"
        height="200"
        item-height="25"
      >
        <template v-slot:default="{ item }">
          <!-- TODO: Highlight winning entries -->
          <v-list-item :key="item">
            <v-list-item-content>
              <v-list-item-title>
                {{ item }}
              </v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: ["raffle"],
  data() {
    return {};
  },
  mounted() {
    if (!this.raffle.open && !this.raffle.airnodeSuccess) {
      this.waitForAirnode();
    }
  },

  methods: {
    async waitForAirnode() {
      const { ethers } = this.$store.state;
      await new Promise((resolve) =>
        ethers.provider.once(
          ethers.raffleContract.filters.WinnersPicked(this.raffle.raffleId),
          resolve
        )
      );
      console.log("FOUND!!!");
      this.$emit("found");
    },
  },
  computed: {},
};
</script>
