<template>
  <v-data-table :items="reports"></v-data-table>
</template>
<script>
export default {
  props: {
    reports: {
      type: Array,
    },
  },
};
</script>
<style></style>
