import { defineStore } from "pinia";

const defaultState = () => ({
  isMobile: false,
  error: true,
  errorMessage: "",
});
export const useSettingsStore = defineStore("settings", {
  state: defaultState,

});
