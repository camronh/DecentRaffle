<template>
  <v-data-table :headers="headers" :items="raffles" item-key="id" dense>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title @click="getRaffles">Raffles</v-toolbar-title>
        <v-spacer></v-spacer>
        <CreateRaffle />
      </v-toolbar>
    </template>
    <template v-slot:item.endTime="{ item }">
      <!-- {{ timeUntil(item.endTime) }} -->
      {{ timeUntil(item.endTime) }} m
    </template>
    <template v-slot:item.balance="{ item }">
      <!-- {{ timeUntil(item.endTime) }} -->
      {{ $ethers.utils.formatEther(item.balance) }}
    </template>

    <template v-slot:item.price="{ item }">
      <!-- {{ timeUntil(item.endTime) }} -->
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
        { text: "ID", value: "id", align: "start" },
        {
          text: "Title",
          sortable: true,
          value: "title",
        },
        { text: "Price", value: "price" },
        { text: "# Winners", value: "winnerCount" },
        { text: "Ends", value: "endTime" },
      ],
      raffles: [
        // {
        //   title: "Big NFT Drop",
        //   id: "4",
        //   price: this.$ethers.utils.parseEther(".5"),
        //   winnerCount: 5,
        //   startTime: Date.now(),
        //   endTime: (Date.now() + 90000) / 1000,
        //   balance: this.$ethers.utils.parseEther("2"),
        // },
        // {
        //   title: "Second NFT Drop",
        //   id: "5",
        //   price: this.$ethers.utils.parseEther(".5"),
        //   winnerCount: 5,
        //   startTime: Date.now(),
        //   endTime: (Date.now() + 90000) / 1000,
        //   balance: this.$ethers.utils.parseEther("2"),
        // },
      ],
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
      const raffleIds = await this.ethers.raffleContract.getEnteredRaffles(
        this.ethers.address
      );
      let raffles = [];
      for (let raffleId of raffleIds) {
        const raffle = await this.ethers.raffleContract.raffles(raffleId);
        raffles.push(raffle);
      }
      this.raffles = raffles;
    },
  },
  computed: {
    ethers() {
      return this.$store.state.ethers;
    },
  },
};
</script>
