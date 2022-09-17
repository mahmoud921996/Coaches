<template>
  <base-card>
    <h2>Find Your coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="forntend">frontend</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">backend</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">career </label>
    </span>
  </base-card>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["change-filter"],
  setup(_, context) {
    // const filters = reactive({
    //   frontend: true,
    //   backend: true,
    //   career: true,
    // });
    const filters = ref({
      frontend: true,
      backend: true,
      career: true,
    });
    function setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...filters.value,
        [inputId]: isActive,
      };
      // Object.assign(filters, updatedFilters);
      filters.value = updatedFilters;
      context.emit("change-filter", filters.value);
    }
    return { setFilter };
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
