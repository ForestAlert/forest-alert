<template>
  <v-data-table :headers="headers" :items="reports">
    <template v-slot:[`item.gravity`]="{ value }">
      <v-rating
        :model-value="value"
        readonly
        active-color="warning"
        empty-icon="mdi-alert-octagon-outline"
        full-icon="mdi-alert-octagon"
        hide-details
      ></v-rating>
    </template>
    <template v-slot:[`item.peoplePresent`]="{ value }">
      <v-icon v-if="value" color="warning">mdi-human-handsup</v-icon>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-card-actions class="justify-end">
        <v-btn @click="$emit('edit', item)"> <v-icon>mdi-pen</v-icon></v-btn>
      </v-card-actions>
    </template>
  </v-data-table>
</template>
<script>
export default {
  emits: ["edit", "add"],
  data() {
    return {
      headers: [
        {
          title: "Posizione",
          value: "position",
        },
        {
          title: "Gravità",
          value: "gravity",
        },
        {
          title: "Sono presenti persone",
          value: "peoplePresent",
        },
        {
          title: "",
          value: "actions",
        },
      ],
    };
  },
  props: {
    reports: {
      type: Array,
    },
  },
};
</script>
<style></style>
