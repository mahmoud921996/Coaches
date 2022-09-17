<template>
  <div>
    <base-dialogue
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialogue>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isloading">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          >
          </request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    RequestItem,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const error = ref(null);
    const receivedRequests = computed(function () {
      return store.getters["requests/requests"];
    });
    const hasRequests = computed(function () {
      return store.getters["requests/hasRequests"];
    });
    async function loadCoaches() {
      isLoading.value = true;
      try {
        await store.dispatch("requests/fetchRequests");
      } catch (err) {
        error.value = err.message || "Something failed!";
      }
      isLoading.value = false;
    }
    loadCoaches();
    function handleError() {
      error.value = null;
    }

    return { receivedRequests, hasRequests, handleError, isLoading, error };
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
