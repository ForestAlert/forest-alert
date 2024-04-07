<template>
  <v-container fluid class="h-100">
    <DesktopView :reports="reports"></DesktopView>
    <ReportDialog />
  </v-container>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { useReportsStore } from "@/stores/reports";
const DesktopView = () => import("@/components/views/Reports/Desktop.vue");
import ReportDialog from "@/components/ReportDialog.vue";
export default {
  setup() {
    return {
      reports$: useReportsStore(),
    };
  },
  computed: {
    reports() {
      return this.reports$.reports;
    },
  },

  components: {
    DesktopView: defineAsyncComponent(DesktopView),
    ReportDialog,
  },
};
</script>
<style lang="scss"></style>
