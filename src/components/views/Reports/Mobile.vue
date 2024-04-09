<template>
  <div class="h-100 d-flex flex-column">
    <v-card-title>Segnalazioni</v-card-title>
    <v-row class="ma-0 h-full" style="overflow: auto">
      <v-col cols="12" v-for="item in reports" :key="item.id">
        <v-card class="">
          <v-card-text class="d-flex flex-column" style="gap: 6px">
            <div><strong>Posizione</strong>: {{ item.position }}</div>
            <div class="d-flex align-center">
              <strong>Gravità</strong>:
              <v-rating
                density="compact"
                :model-value="item.gravity"
                readonly
                active-color="warning"
                empty-icon="mdi-alert-octagon-outline"
                full-icon="mdi-alert-octagon"
                hide-details
              ></v-rating>
            </div>
            <div>
              <strong>Persone presenti: </strong>:
              {{ item.peoplePresent ? "Si" : "No" }}
            </div>
            <div>
              <div></div>
            </div>
          </v-card-text> </v-card
      ></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  emits: ["edit", "add"],
  props: {
    reports: {
      type: Array,
    },
  },
};
</script>
<style lang=""></style>
