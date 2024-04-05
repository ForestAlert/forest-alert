<template>
  <v-container fluid class="h-100">
    <DesktopView></DesktopView>
  </v-container>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { useReportsStore } from "@/stores/reports";
const DesktopView = () => import("@/components/views/Reports/Desktop.vue");
export default {
  components: {
    DesktopView: defineAsyncComponent(DesktopView),
  },
};
</script>
<style lang="scss"></style>
