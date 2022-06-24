<template>
  <v-snackbar :color="log.color" v-model="log.open">{{ log.msg }}</v-snackbar>
</template>

<script>
export default {
  components: {},
  props: ["log"],
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
