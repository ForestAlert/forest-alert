import { defineStore } from "pinia";
import { firebaseAuth, firebaseStore } from "@/plugins/firebase";


export const useProfilesStore = defineStore("profiles", {

    actions: {
        async GET(id) {
            const doc = await firebaseStore.collection("profiles").doc(id).get();
            return {
                id: doc.id,
                ...doc.data(),
            };
        }
    }
});
