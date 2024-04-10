<template>
  <v-app style="height: 100vh">
    <router-view></router-view>
    <ErrorSnackbarVue />
  </v-app>
</template>

<script>
const BREAKPOINT = 900;
import { useSettingsStore } from "@/stores/settings";
import ErrorSnackbarVue from './components/ErrorSnackbar.vue';
export default {
  setup() {
    return {
      settings$: useSettingsStore(),
    };
  },
  components: {
    ErrorSnackbarVue,
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
