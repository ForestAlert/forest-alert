<template>
  <v-container fluid class="h-100" style="overflow: hidden">
    <MobileView
      v-if="settings$.isMobile"
      @add="add"
      @edit="edit"
      :reports="reports"
    ></MobileView>
    <DesktopView
      v-else
      @add="add"
      @edit="edit"
      :reports="reports"
    ></DesktopView>
    <ReportDialog ref="reportDialog" />
  </v-container>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { useReportsStore } from "@/stores/reports";
import { useSettingsStore } from "@/stores/settings";
const DesktopView = () => import("@/components/views/Reports/Desktop.vue");
const MobileView = () => import("@/components/views/Reports/Mobile.vue");
import ReportDialog from "@/components/ReportDialog.vue";
export default {
  setup() {
    return {
      reports$: useReportsStore(),
      settings$: useSettingsStore(),
    };
  },
  computed: {
    reports() {
      return this.reports$.reports;
    },
  },
  methods: {
    edit(item) {
      this.$refs.reportDialog.open(Object.assign({}, item));
    },
    add() {
      this.$refs.reportDialog.open();
    },
  },

  components: {
    DesktopView: defineAsyncComponent(DesktopView),
    MobileView: defineAsyncComponent(MobileView),
    ReportDialog,
  },
};
</script>
<style lang="scss"></style>
