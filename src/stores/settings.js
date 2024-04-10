import { defineStore } from "pinia";

const defaultState = () => ({
  isMobile: false,
  error: false,
  errorMessage: "",
});
export const useSettingsStore = defineStore("settings", {
  state: defaultState,

});
