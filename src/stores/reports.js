import { defineStore } from "pinia";
import { firebaseAuth, firebaseStore } from "@/plugins/firebase";
import { useAuthStore } from "./auth";
const defaultState = () => ({
  reports: [],
  unsubscribe: null,
});
export const useReportsStore = defineStore("reports", {
  state: defaultState,
  actions: {
    async LIST() {
      const ref = firebaseStore
        .collection("reports")
        .where("deleted", "==", true);
      const data = await ref.get();
      this.reports = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.unsubscribe = ref.onSnapshot((querySnapshot) => {
        this.reports = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },
    async CREATE(data) {
      const payload = {
        position: data.position,
        description: data.description,
        gravity: data.gravity,
        peoplePresent: data.peoplePresent,
        deleted: true,

        hasImage: false,
        createdAt: new Date(),
        createdBy: useAuthStore().uid,
      };
      await firebaseStore.collection("reports").add(payload);
    },
    async UPDATE(id, data) {
      const payload = {
        position: data.position,
        description: data.description,
        gravity: data.gravity,
        peoplePresent: data.peoplePresent,
      };
      await firebaseStore.collection("reports").doc(id).update(payload);
    },
    async DELETE(id) {
      await firebaseStore
        .collection("reports")
        .doc(id)
        .update({ deleted: true });
    },

    async UPLOAD_IMAGE(id, file, filename = "") {
      var storageRef = firebase.storage().ref();
      var extension = filename.split(".").at(-1);
      var ref = storageRef.child(`reports/${id}/image.${extension}`);
      await ref.put(file);
      await firebaseStore.collection("reports").doc(id).update({
        hasImage: true,
      });
    },
  },
});
