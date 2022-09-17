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
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>

    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</base-button
          >
          <base-button
            link
            to="/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>



<script>
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";
export default {
  components: {
    CoachFilter,
    CoachItem,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const error = ref(null);
    const activeFilter = ref({
      frontend: true,
      backend: true,
      career: true,
    });
    const filteredCoaches = computed(function () {
      const coachList = store.getters["coaches/coaches"];
      return coachList.filter((coach) => {
        if (activeFilter.value.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (activeFilter.value.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (activeFilter.value.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    });

    const isCoach = computed(function () {
      return store.getters["coaches/isCoach"];
    });
    function setFilters(updatedFilters) {
      activeFilter.value = updatedFilters;
    }
    async function loadCoaches(refresh = false) {
      isLoading.value = true;
      try {
        await store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (err) {
        //errr
        error.value = err.message || "Something went wrong!";
      }
      isLoading.value = false;
    }
    loadCoaches();

    function handleError() {
      error.value = null;
    }
    const hasCoaches = computed(function () {
      return store.getters["coaches/hasCoaches"];
    });

    const isLoggedIn = computed(function () {
      return store.getters.isAuthenticated;
    });
    return {
      setFilters,
      filteredCoaches,
      loadCoaches,
      isCoach,
      hasCoaches,
      isLoading,
      error,
      handleError,
      isLoggedIn,
    };
  },
};
</script>


<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>