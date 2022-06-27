<template>
  <v-container class="home">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="raffles"
        item-key="raffleId"
        dense
        :search="search"
        @click:row="goToRaffle"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title @click="getRaffles">Raffles</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <!-- TODO: #1 Create a search bar -->
            <v-text-field
              outlined
              dense
              v-model="search"
              placeholder="RaffleID"
              label="Search"
            >
            </v-text-field>
            <v-btn
              :disabled="!search || isNaN(search)"
              @click="goToRaffle({ raffleId: search })"
            >
              <v-icon> mdi-magnify </v-icon>
            </v-btn>
            <CreateRaffle @success="getRaffles" />
          </v-toolbar>
        </template>
        <template v-slot:item.endTime="{ item }">
          <v-chip v-if="!item.open" x-small outlined color="grey"
            >Closed</v-chip
          >
          <v-chip
            v-else-if="item.open && timeUntil(item.endTime) == 0"
            x-small
            outlined
            color="primary"
            >Closable!</v-chip
          >
          <template v-else> {{ timeUntil(item.endTime) }} m </template>
        </template>

        <template v-slot:item.price="{ item }">
          {{ $ethers.utils.formatEther(item.price) }}
        </template>
        <template v-slot:item.title="{ item }">
          {{ item.title }}
          <v-icon v-if="owner(item.owner)" color="primary" x-small
            >mdi-check</v-icon
          >
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import CreateRaffle from "../components/CreateRaffleDialog.vue";

export default {
  components: {
    CreateRaffle,
  },
  data() {
    return {
      expanded: [],
      search: "",
      headers: [
        { text: "ID", value: "raffleId", align: "start" },
        {
          text: "Title",
          sortable: true,
          value: "title",
        },
        { text: "Price", value: "price" },
        { text: "# Winners", value: "winnerCount" },
        { text: "Ends", value: "endTime" },
      ],
      raffles: [],
    };
  },
  created() {
    this.getRaffles();
  },
  methods: {
    timeUntil(endTime) {
      const now = Date.now() / 1000;
      const secondsLeft = endTime - now;
      const minutes = Math.round((secondsLeft / 60) * 10) / 10;
      return minutes > 0 ? minutes : 0;
    },
    owner(address) {
      return this.ethers.address == address;
    },
    async getRaffles() {
      let raffleIds = await this.ethers.raffleContract.getEnteredRaffles(
        this.ethers.address
      );
      raffleIds = raffleIds.map((raffleId) => raffleId.toString());
      raffleIds = [...new Set(raffleIds)];

      let ownedRaffles = await this.ethers.raffleContract.getAccountRaffles(
        this.ethers.address
      );
      let raffles = [...ownedRaffles];

      const ownedRaffleIds = ownedRaffles.map((raffle) =>
        raffle.raffleId.toString()
      );

      for (let raffleId of raffleIds) {
        console.log({ raffleId });
        if (!ownedRaffleIds.includes(raffleId)) {
          const raffle = await this.ethers.raffleContract.raffles(raffleId);
          console.log({ raffle });
          raffles.push(raffle);
        }
      }
      this.raffles = raffles;
    },
    goToRaffle(item) {
      this.$router.push(`/raffle/${item.raffleId}`);
    },
  },
  computed: {
    ethers() {
      return this.$store.state.ethers;
    },
  },
};
</script>
