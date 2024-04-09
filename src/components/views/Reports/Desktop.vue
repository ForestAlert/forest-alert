<template>
  <v-card class="h-100 w-100 d-flex flex-column">
    <v-card-title class="d-flex"
      >Segnalazioni <v-spacer></v-spacer
      ><v-btn @click="$emit('add')" elevation="0"
        >Aggiungi segnalazione</v-btn
      ></v-card-title
    >
    <div style="height: 100%; overflow: hidden">
      <v-data-table
        style="height: 100%; overflow: hidden; max-height: 100%"
        :headers="headers"
        :items="reports"
        fixed-footer
      >
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
        <template v-slot:[`item.description`]="{ value }">
          <div class="description-ellipses">{{ value }}</div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-card-actions class="justify-end">
            <v-btn @click="$emit('edit', item)">
              <v-icon>mdi-pen</v-icon></v-btn
            >
          </v-card-actions>
        </template>
      </v-data-table>
    </div>
  </v-card>
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
          title: "Descrizione",
          value: "description",
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
<style>
.description-ellipses {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
