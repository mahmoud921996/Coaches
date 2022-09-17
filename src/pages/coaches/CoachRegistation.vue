<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>


<script>
import CoachForm from "../../components/coaches/CoachForm";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    CoachForm,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    function saveData(data) {
      //logic
      store.dispatch("coaches/registerCoach", data);
      router.replace("/coaches");
    }
    return { saveData };
  },
};
</script>