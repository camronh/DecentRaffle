<template>
  <v-card>
    <p v-if="raffle.id == 0">Not a valid raffle ID</p>
    <template v-else>
      <v-card-title>
        {{ raffle.title }} (ID: {{ raffle.id }})
        <v-spacer></v-spacer>
        {{ owner ? weiToEth(raffle.balance) : weiToEth(raffle.price) }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card outlined height="100%">
              <v-card-text>
                <p><b>Owner:</b> {{ raffle.owner }}</p>
                <p><b>Price: </b> {{ weiToEth(raffle.price) }}</p>
                <p><b>Entries:</b> {{ entries.length }}</p>
                <p><b>Winner Count:</b> {{ raffle.winnerCount }}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card outlined height="100%">
              <v-card-text justify="center" align="center">
                <h1>{{ timeUntil(raffle.endTime) }} min</h1>
                <br />
                <v-chip
                  small
                  outlined
                  :color="raffle.open ? 'green' : 'grey'"
                  >{{ raffle.open ? "Open!" : "Closed" }}</v-chip
                >
                <br />
              </v-card-text>
              <v-card-text justify="center" align="center">
                <template v-if="enterable">
                  <v-col cols="12" md="5">
                    <v-text-field
                      type="number"
                      v-model="entriesCount"
                      suffix="Entries"
                    >
                      <template v-slot:append-outer>
                        <v-btn
                          class="mx-2"
                          dense
                          small
                          text
                          outlined
                          color="primary"
                        >
                          <span><v-icon>mdi-check</v-icon></span>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                </template>
                <v-btn color="primary" class="mx-2" v-else>
                  <span>Close Raffle</span>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "Raffle",
  data() {
    return {
      raffle: null,
      entries: [],
      entriesCount: 1,
    };
  },
  methods: {
    async getRaffle() {
      const raffleId = this.$route.params.id;
      let raffle = await this.ethers.raffleContract.raffles(raffleId);
      await this.getEntries();
      this.raffle = raffle;
    },
    timeUntil(endTime) {
      const now = Date.now() / 1000;
      const secondsLeft = endTime - now;
      const minutes = Math.round((secondsLeft / 60) * 10) / 10;
      return minutes > 0 ? minutes : 0;
    },
    async getEntries() {
      const raffleId = this.$route.params.id;
      this.entries = await this.ethers.raffleContract.getEntries(raffleId);
      console.log({ entries: this.entries });
    },
    weiToEth(wei) {
      return `${this.$ethers.utils.formatEther(wei)} Ξ`;
    },
    //
  },
  created() {
    this.getRaffle();
  },
  computed: {
    //
    ethers() {
      return this.$store.state.ethers;
    },
    owner() {
      return this.ethers.address == this.raffle.owner;
    },
    entered() {
      return this.entries.includes(this.ethers.address);
    },
    enterable() {
      return this.raffle.open && this.timeUntil(this.raffle.endTime) > 0;
    },
  },
};
</script>
