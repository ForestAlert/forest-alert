import { defineStore } from "pinia";

const defaultState = () => ({
  isMobile: false,
});
export const useSettingsStore = defineStore("settings", {
  state: defaultState,
});
