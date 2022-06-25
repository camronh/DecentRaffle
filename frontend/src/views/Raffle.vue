<template>
  <v-card>
    <p v-if="raffle.raffleId == 0">Not a valid raffle ID</p>
    <template v-else>
      <v-card-title>
        {{ raffle.title }} (ID: {{ raffle.raffleId }})
        <v-spacer></v-spacer>
        {{ owner ? weiToEth(raffle.balance) : weiToEth(raffle.price) }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card outlined height="100%">
              <v-card-text>
                <p>
                  <b>Owner:</b> {{ raffle.owner }}
                  <v-icon v-if="owner" x-small color="primary"
                    >mdi-check-circle</v-icon
                  >
                </p>
                <p><b>Price: </b> {{ weiToEth(raffle.price) }}</p>
                <p><b>Entries:</b> {{ entries.length }}</p>
                <p><b>Winner Count:</b> {{ raffle.winnerCount }}</p>
                <p><b>Your Entries:</b> {{ userEntries }}</p>
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
                          @click="enterRaffle"
                          :loading="entering"
                        >
                          <span><v-icon>mdi-check</v-icon></span>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                </template>
                <v-btn color="primary" class="mx-2" v-else @click="closeRaffle">
                  <span>Close Raffle</span>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
    <SnackBar :log="snackBarLog" />
  </v-card>
</template>

<script>
import SnackBar from "../components/SnackBar.vue";

export default {
  name: "Raffle",
  data() {
    return {
      raffle: null,
      entries: [],
      entriesCount: 1,
      entering: false,
      snackBarLog: {
        open: false,
        msg: "",
        color: "",
      },
    };
  },
  components: {
    SnackBar,
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
    },
    weiToEth(wei) {
      return `${this.$ethers.utils.formatEther(wei)} Ξ`;
    },
    async enterRaffle() {
      this.entering = true;
      try {
        const totalCost =
          this.entriesCount * this.$ethers.utils.formatEther(this.raffle.price);
        const tx = await this.ethers.raffleContract.enter(
          this.$route.params.id,
          this.entriesCount,
          {
            value: this.$ethers.utils.parseEther(`${totalCost}`),
          }
        );
        await tx.wait();
        await this.getRaffle();
        this.entriesCount = 1;
        this.snackBarLog = {
          open: true,
          msg: "Successfully entered raffle!",
          color: "green",
        };
      } catch (error) {
        console.log(error);
        this.snackBarLog = {
          open: true,
          msg: "Entering raffle failed!",
          color: "error",
        };
      }
      this.entering = false;
    },
    async closeRaffle() {
      this.closing = true;
      try {
        const tx = await this.ethers.raffleContract.close(
          this.$route.params.id,
          {
            value: this.$ethers.utils.parseEther("0.001"),
          }
        );
        await tx.wait();
        await this.getRaffle();
        this.snackBarLog = {
          open: true,
          msg: "Successfully closed raffle!",
          color: "green",
        };
      } catch (error) {
        console.log(error);
        this.snackBarLog = {
          open: true,
          msg: "Closing raffle failed!",
          color: "error",
        };
      }
      this.closing = false;
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
    userEntries() {
      return this.entries.filter((entry) => entry == this.ethers.address)
        .length;
    },
  },
};
</script>
