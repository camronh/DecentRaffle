<template>
  <v-btn @click="dialogOpen = true">
    <v-icon>mdi-plus</v-icon>
    <v-dialog v-model="dialogOpen" max-width="50%">
      <v-card>
        <!-- TODO: #3 Validation -->
        <v-card-title>
          <span class="headline">Create Raffle </span>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="title"
                label="Title"
                required
                autofocus
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="price"
                label="Price"
                suffix="Ξ"
                type="number"
                required
                class="mx-2"
                autofocus
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="winnerCount"
                label="Number of Winners"
                class="mx-2"
                type="number"
                required
                autofocus
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <DateTime title="Start Time" v-model="startTime" :now="true" />
            </v-col>
            <v-col cols="12" md="6">
              <DateTime title="End Time" v-model="endTime" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" flat @click="dialogOpen = false"> Cancel </v-btn>
          <!-- TODO: #10 Loading here -->
          <v-btn color="primary" flat @click="createRaffle" :disabled="!valid">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
import DateTime from "./DateTime.vue";

export default {
  components: {
    DateTime,
  },
  data() {
    return {
      dialogOpen: false,
      title: "Test Title",
      price: ".5",
      winnerCount: "5",
      startTime: "",
      endTime: "1656179560",
    };
  },
  methods: {
    async createRaffle() {
      // TODO: Loading
      try {
        console.log(this.startTime, this.endTime);
        const { raffleContract } = this.ethers;

        const createTx = await raffleContract.create(
          this.$ethers.utils.parseEther(this.price),
          this.winnerCount,
          this.title,
          this.startTime,
          this.endTime
        );
        
        const rc = await createTx.wait();
        const [raffleId] = rc.events.find(
          (event) => event.event === "RaffleCreated"
        ).args;
        console.log(`Created Raffle (ID: ${raffleId})`);
        this.$emit("success", raffleId);
        this.dialogOpen = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    valid() {
      console.log({
        title: this.title.length > 0,
        price: this.price > 0,
        winnerCount: this.winnerCount > 0,
        startTime: this.startTime > 0,
        endTime: this.endTime > 0,
        between: this.startTime < this.endTime,
      });
      return (
        this.title &&
        this.price >= 0 &&
        this.winnerCount > 0 &&
        this.startTime &&
        this.endTime &&
        this.startTime < this.endTime
      );
    },
    ethers() {
      return this.$store.state.ethers;
    },
  },
};
</script>
