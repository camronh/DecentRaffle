<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateAndTime"
        :label="title"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        @click="
          dateMenu = true;
          timeMenu = false;
        "
      ></v-text-field>
    </template>
    <v-date-picker
      v-if="dateMenu"
      v-model="date"
      no-title
      scrollable
      :min="minDate"
      @input="
        timeMenu = true;
        dateMenu = false;
      "
    >
    </v-date-picker>
    <v-time-picker
      v-if="timeMenu"
      v-model="time"
      landscape
      :min="dateIsToday ? minTime : '00:00'"
      @click:minute="
        $refs.menu.save(time);
        updateTimestamp();
      "
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    date: "",
    time: "",
    menu: false,
    modal: false,
    timeMenu: false,
    dateMenu: true,
  }),
  components: {},
  props: ["title"],
  methods: {
    updateTimestamp() {
      this.$emit("input", this.utcDateTime);
    },
  },
  computed: {
    dateAndTime() {
      if (!this.date || !this.time) return "";
      //   Convert YYYY-MM-DD HH:MM:SS to M/D/YY H:M A Timezone
      return this.moment(
        `${this.date} ${this.time}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format("M/D/YY @ h:mm A");
    },
    moment() {
      return require("moment");
    },
    minDate() {
      return this.moment().format("YYYY-MM-DD");
    },
    minTime() {
      return this.moment().format("HH:mm");
    },
    utcDateTime() {
      // Unix timestamp in seconds of the date and time
      return this.moment(
        `${this.date} ${this.time}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format("X");
    },
    dateIsToday() {
      // If the date is today, return true
      return this.moment(this.date, "YYYY-MM-DD").isSame(this.moment(), "day");
    },
  },
};
</script>
