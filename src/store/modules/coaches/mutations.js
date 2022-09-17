export default {
  setCoach(state, payload) {
    state.coaches = payload;
  },
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
