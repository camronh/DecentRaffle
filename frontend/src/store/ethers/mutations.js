/* eslint-disable */
export default {
  initialized: function (state, value) {
    state.initialized = value
  },
  connected: function (state, value) {
    state.connected = value
  },
  error: function (state, value) {
    state.error = value
  },
  user: function (state, value) {
    state.user = value
  },
  address: function (state, value) {
    state.address = value
  },
  network: function (state, value) {
    state.network = value
  },
  ens: function (state, value) {
    state.ens = value
  },
  wallet: function (state, value) {
    state.wallet = value
  },
  rrpContract: function (state, value) {
    state.rrpContract = value
  },
  raffleContract: function (state, value) {
    state.raffleContract = value
  }
}
