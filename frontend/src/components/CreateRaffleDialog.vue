<template>
  <v-btn @click="dialogOpen = true">
    <v-icon>mdi-plus</v-icon>
    <v-dialog v-model="dialogOpen">
      <v-card>
        <v-card-title>
          <span class="headline">Create Raffle</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="title"
            label="Title"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="price"
            label="Price"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="winnerCount"
            label="Number of Winners"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="endTime"
            label="End Time"
            required
            autofocus
          ></v-text-field>
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
export default {
  components: {},
  data() {
    return {
      dialogOpen: false,
      title: "Test Title",
      price: ".5",
      winnerCount: "5",
      endTime: "",
    };
  },
  methods: {},
  computed: {},
};
</script>
