<template>
  <div class="q-pa-md row items-start q-gutter-md absolute-center q-my-md">
    <q-card class="my-card">
      <q-card-section>
        <q-form class="q-pa-md" @submit="signInWithEmail">
          <div class="flex column q-gutter-sm text-center" style="width: 300px">
            <q-input type="email" v-model="email" label="Username *" />
            <q-input type="password" v-model="password" label="Password *" />
            <q-btn
              class="q-mt-lg"
              outline
              style="color: #1976d2"
              label="Sign In"
              type="submit"
            />
            <p class="q-mt-lg text-bold">OR</p>
            <q-btn
              @click="signInWithGoogle"
              outline
              style="color: #1976d2"
              label="Sign In with"
              icon-right="img:src/assets/google.png"
            />
            <p class="text-bold q-mt-lg">
              Don't Have an Account?
              <router-link to="/SignUp"> Sign Up </router-link>
            </p>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXnzTqvVhBlJlZUTauc-5dY6DIIkJv3g4",
  authDomain: "myproject-bc18e.firebaseapp.com",
  databaseURL: "https://myproject-bc18e-default-rtdb.firebaseio.com",
  projectId: "myproject-bc18e",
  storageBucket: "myproject-bc18e.appspot.com",
  messagingSenderId: "153215190685",
  appId: "1:153215190685:web:77b7c5c9f8093034393674",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firebaseGoogleAuthProvider = new GoogleAuthProvider();

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signInWithEmail() {
      try {
        const { email, password } = this;
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = firebaseAuth.currentUser;
        if (user) {
          await user.getIdToken(true);
          console.log("Firebase ID token:", user.getIdToken());
        }
        this.$router.push("/todo");
      } catch (error) {
        console.error(
          "Error signing in with email and password:",
          error.message
        );
      }
    },
    async signInWithGoogle() {
      try {
        await signInWithPopup(firebaseAuth, firebaseGoogleAuthProvider);
        const user = firebaseAuth.currentUser;
        if (user) {
          await user.getIdToken(true);
          console.log("Firebase ID token:", user.getIdToken());
        }
        this.$router.push("/todo");
      } catch (error) {
        console.error("Error signing in with Google:", error.message);
      }
    },
  },
};
</script>
