<template>
  <div>
    <base-dialogue
      :show="!!error"
      title="An error occurred"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialogue>
    <base-dialogue :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialogue>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long)
        </p>
        <base-button> {{ submitButtonCaption }} </base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const formIsValid = ref(true);
    const isLoading = ref(false);
    const error = ref(null);
    const mode = ref("login");
    const submitButtonCaption = computed(function () {
      return mode.value === "login" ? "login" : "Signup";
    });
    const switchModeButtonCaption = computed(function () {
      return mode.value === "login" ? "Signup instead" : "login instead";
    });

    function switchAuthMode() {
      if (mode.value === "login") {
        mode.value = "signup";
      } else {
        mode.value = "login";
      }
    }
    async function submitForm() {
      formIsValid.value = true;
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        password.value.length < 6
      ) {
        formIsValid.value = false;
        return;
      }
      isLoading.value = true;
      const actionPayload = {
        email: email.value,
        password: password.value,
      };
      // store dispatch action
      try {
        if (mode.value === "signup") {
          await store.dispatch("signup", actionPayload);
        } else {
          await store.dispatch("login", actionPayload);
        }
        const redirectUrl = "/" + (route.query.redirect || "coaches");
        router.replace(redirectUrl);
      } catch (error) {
        error.value = error.message || "Failed to authenticate, try later.";
      }
      isLoading.value = false;
    }
    function handleError() {
      error.value = null;
    }
    return {
      email,
      password,
      formIsValid,
      submitButtonCaption,
      switchModeButtonCaption,
      switchAuthMode,
      submitForm,
      isLoading,
      error,
      handleError,
    };
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>