<template>
  <v-app style="height: 100vh">
    <router-view></router-view>
  </v-app>
</template>

<script>
const BREAKPOINT = 900;
import { useSettingsStore } from "@/stores/settings";
export default {
  setup() {
    return {
      settings$: useSettingsStore(),
    };
  },
  methods: {
    setIsMobile() {
      this.settings$.isMobile = window.innerWidth < BREAKPOINT;
    },
  },
  mounted() {
    window.addEventListener("resize", this.setIsMobile);
    this.setIsMobile();
  },
};
</script>

<style scoped></style>
