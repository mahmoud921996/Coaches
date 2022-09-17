<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button v-if="showContactBtn" link :to="contactLink"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  props: ["id"],
  setup(props) {
    const store = useStore();

    const route = useRoute();
    const selectedCoach = ref(null);
    const fullName = computed(function () {
      return selectedCoach.value.firstName + " " + selectedCoach.value.lastName;
    });
    const areas = computed(function () {
      return selectedCoach.value.areas;
    });
    const rate = computed(function () {
      return selectedCoach.value.hourlyRate;
    });

    const description = computed(function () {
      return selectedCoach.value.description;
    });
    const contactLink = computed(function () {
      return route.path + "/contact";
    });
    const showContactBtn = computed(function () {
      return !route.path.includes("contact");
    });

    function loadCoach() {
      return store.getters["coaches/coaches"].find(
        (coach) => coach.id === props.id
      );
    }
    selectedCoach.value = loadCoach();

    return { fullName, contactLink, areas, rate, description, showContactBtn };
  },
};
</script>
