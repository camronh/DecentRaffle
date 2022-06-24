<template>
  <v-data-table
    :headers="headers"
    :items="raffles"
    item-key="raffleId"
    dense
    @click:row="goToRaffle"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title @click="getRaffles">Raffles</v-toolbar-title>
        <v-spacer></v-spacer>
        <CreateRaffle />
      </v-toolbar>
    </template>
    <template v-slot:item.endTime="{ item }">
      {{ timeUntil(item.endTime) }} m
    </template>

    <template v-slot:item.price="{ item }">
      {{ $ethers.utils.formatEther(item.price) }}
    </template>
  </v-data-table>
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
      console.log(this.$ethers.utils);
      return Math.round((secondsLeft / 60) * 10) / 10;
    },
    async getRaffles() {
      let raffleIds = await this.ethers.raffleContract.getEnteredRaffles(
        this.ethers.address
      );
      // Remove duplicate BigNumbers raffleIds based on hex
      raffleIds = raffleIds.map((raffleId) => raffleId.toString());
      raffleIds = [...new Set(raffleIds)];

      console.log({ raffleIds });

      let raffles = [];
      for (let raffleId of raffleIds) {
        const raffle = await this.ethers.raffleContract.raffles(raffleId);
        raffles.push(raffle);
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
