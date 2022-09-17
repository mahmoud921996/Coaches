<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Find a Coach</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/coaches">Coaches</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth"> login </router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const isLoggedIn = computed(function () {
      return store.getters.isAuthenticated;
    });
    function logout() {
      store.dispatch("logout");
      router.replace("/coaches");
    }
    return { isLoggedIn, logout };
  },
};
</script>

<style scoped>
header {
  background-color: #3d008d;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}
h1 a {
  color: #fff;
  margin: 0;
}
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
li {
  margin: 0 0.5rem;
}
</style>