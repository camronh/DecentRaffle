<template>
  <v-data-table
    :headers="headers"
    :items="raffles"
    single-expand
    show-expand
    item-key="id"
    dense
    :expanded.sync="expanded"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Raffles</v-toolbar-title>
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
export default {
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
        { text: "Balance", value: "balance" },
        { text: "", value: "data-table-expand" },
      ],
      raffles: [
        {
          title: "Big NFT Drop",
          id: "4",
          price: this.$ethers.utils.parseEther(".5"),
          winnerCount: 5,
          startTime: Date.now(),
          endTime: (Date.now() + 90000) / 1000,
          balance: this.$ethers.utils.parseEther("2"),
        },
        {
          title: "Second NFT Drop",
          id: "5",
          price: this.$ethers.utils.parseEther(".5"),
          winnerCount: 5,
          startTime: Date.now(),
          endTime: (Date.now() + 90000) / 1000,
          balance: this.$ethers.utils.parseEther("2"),
        },
      ],
    };
  },
  methods: {
    timeUntil(endTime) {
      const now = Date.now() / 1000;
      const secondsLeft = endTime - now;
      console.log(this.$ethers.utils);
      return Math.round((secondsLeft / 60) * 10) / 10;
    },
  },
  computed: {
    // ethers(){
    //   return this.$store.state.ethers;
    // }
  },
};
</script>
