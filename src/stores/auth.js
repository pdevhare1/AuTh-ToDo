import { defineStore } from "pinia";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../boot/firebaseConfig";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  actions: {
    async signInWithEmailAndPassword(email, password) {
      try {
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        this.user = userCredential.user;
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const userCredential = await firebase.auth().signInWithPopup(provider);
        this.user = userCredential.user;
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async signOut() {
      try {
        await firebase.auth().signOut();
        this.user = null;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
