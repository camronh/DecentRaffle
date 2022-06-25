<template>
  <v-btn @click="dialogOpen = true">
    <v-icon>mdi-plus</v-icon>
    <v-dialog v-model="dialogOpen" max-width="50%">
      <v-card>
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
              <DateTime title="Start Time" v-model="startTime" />
            </v-col>
            <v-col cols="12" md="6">
              <DateTime title="End Time" v-model="endTime" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" flat @click="dialogOpen = false"> Cancel </v-btn>
          <v-btn color="primary" flat @click="createRaffle"> Create </v-btn>
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
      dialogOpen: true,
      title: "Test Title",
      price: ".5",
      winnerCount: "5",
      date: "",
      startTime: "",
      endTime: "",
    };
  },
  methods: {
    async createRaffle() {},
  },
  computed: {},
};
</script>
