<template>
  <div class="h-100 d-flex flex-column" style="overflow: hidden">
    <v-card-title>Segnalazioni</v-card-title>
    <div class="h-full" style="overflow: hidden">
      <v-row class="ma-0" style="overflow: auto; max-height: 100%">
        <v-col cols="12" v-if="!reports.length">
          <v-alert title="Nessuna segnalazione presente"></v-alert>
        </v-col>
        <v-col
          cols="12"
          v-for="item in reports"
          :key="item.id"
          style="height: fit-content"
        >
          <v-card class="">
            <v-btn
              position="absolute"
              absolute
              elevation="0"
              style="right: 0px; top: 0px"
              icon="mdi-pen"
              @click="$emit('edit', item)"
            />
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
                <strong>Descrizione</strong>
                <div class="mobile-description">{{ item.description }}</div>
              </div>
            </v-card-text>
          </v-card></v-col
        >
      </v-row>
    </div>
    <v-btn
      position="absolute"
      absolute
      style="right: 16px; bottom: 16px"
      icon="mdi-plus"
      @click="$emit('add')"
    />
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

<style lang="scss">
.mobile-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Number of lines to show */
  text-overflow: ellipsis;
}
</style>
