import { defineStore } from "pinia";
import { firebaseAuth, firebaseStore, firebaseStorage } from "@/plugins/firebase";
import { useAuthStore } from "./auth";
const defaultState = () => ({
  reports: [],
  unsubscribe: null,
});

function convertFirebaseDate(fbDate) {
  if (!fbDate) return "";
  return new Date(fbDate.seconds * 1000);
}

export const useReportsStore = defineStore("reports", {
  state: defaultState,
  actions: {
    async LIST() {
      const ref = firebaseStore
        .collection("reports")
        .where("deleted", "==", false);
      const data = await ref.get();
      this.reports = data.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt_date: convertFirebaseDate(data.createdAt),
        };
      });
      this.unsubscribe = ref.onSnapshot((querySnapshot) => {
        this.reports = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt_date: convertFirebaseDate(data.createdAt),
          };
        });
      });
    },
    async CREATE(data) {
      const payload = {
        position: data.position,
        description: data.description,
        gravity: data.gravity,
        peoplePresent: data.peoplePresent,
        deleted: false,

        image: null,
        createdAt: new Date(),
        createdBy: useAuthStore().uid,
      };
      const response = await firebaseStore.collection("reports").add(payload);
      return response.id;
    },
    async UPDATE(id, data) {
      const payload = {
        position: data.position,
        description: data.description,
        gravity: data.gravity,
        peoplePresent: data.peoplePresent,
      };
    await firebaseStore.collection("reports").doc(id).update(payload);
      return id;
    },
    async DELETE(id) {
      await firebaseStore
        .collection("reports")
        .doc(id)
        .update({ deleted: true });
    },

    async UPLOAD_IMAGE(id, file, filename = "") {
      console.log("Uploading image", id, file, filename);
      var storageRef = firebaseStorage.ref();
  
      var ref = storageRef.child(`reports/${id}/${filename}`);
      await ref.put(file);
      await firebaseStore.collection("reports").doc(id).update({
        image: filename,
      });
    },
    async DOWNLOAD_IMAGE(id, filename = "") {
      var storageRef = firebaseStorage.ref();
      var ref = storageRef.child(`reports/${id}/${filename}`);
      var url = await ref.getDownloadURL();
      return url;


    }
  },
});
