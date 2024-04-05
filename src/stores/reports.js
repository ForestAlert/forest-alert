import { defineStore } from "pinia";
import { firebaseAuth, firebaseStore } from "@/plugins/firebase";
const defaultState = () => ({
  reports: [],
});
export const useReportsStore = defineStore("reports", {
  state: defaultState,
  actions: {
    async LIST() {
      const docs = await firebaseStore.collection("reports").get();
      this.reports = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  },
});
