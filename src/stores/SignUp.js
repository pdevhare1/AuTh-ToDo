import { defineStore } from "pinia";
import { auth } from "../boot/firebaseConfig";
import { api } from "../boot/axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  actions: {
    async signUp({ name, email, password }) {
      try {
        // Call the Firebase Auth API for sign-up
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        // Optionally, update user profile information
        await userCredential.user.updateProfile({
          displayName: name,
        });

        this.user = userCredential.user;
        return this.user;
      } catch (error) {
        console.error("Error signing up:", error);
        throw error;
      }
    },
  },
});
