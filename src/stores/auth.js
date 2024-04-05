import { defineStore } from "pinia";
import { firebaseAuth, firebaseStore } from "@/plugins/firebase";

const defaultState = () => ({
  user: null,
  profile: null,
  initialized: false,
});
export const useAuthStore = defineStore("auth", {
  state: defaultState,

  actions: {
    async GET_USER(user) {
      this.user = user;
      console.log("UID", user.uid);
      const doc = await firebaseStore.collection("utenti").doc(user.uid).get();
      this.profile = {
        id: doc.id,
        ...doc.data(),
      };
    },

    CLEAR() {
      this.profile = null;
      this.user = null;
    },

    async LOGIN({ email, password }) {
      const { user } = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
    },
    async SIGNUP({ firstName, lastName, email, birthdate, password }) {
      const { user } = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const doc = await firebaseStore.collection("utenti").doc(user.uid).set({
        firstName,
        lastName,
        email,
        birthdate,
      });
    },
  },
});
