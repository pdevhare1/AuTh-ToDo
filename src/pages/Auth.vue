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
            <q-btn
              @click="signInWithGithub"
              outline
              style="color: #1976d2"
              label="Sign In with"
              icon-right="img:src/assets/github.png"
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
import { onMounted } from "vue";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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
const firebaseGithubAuthProvider = new GithubAuthProvider();
const db = getFirestore();

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
        const { user } = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        if (user) {
          const uniqueId = this.getOrCreateUniqueId(user.uid);
          await user.getIdToken(true);
          console.log("Firebase ID token:", user.getIdToken());
          this.storeTokenAndUniqueIdInLocalStorage(user.getIdToken(), uniqueId);
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
        const { user } = await signInWithPopup(
          firebaseAuth,
          firebaseGoogleAuthProvider
        );
        if (user) {
          const uniqueId = this.getOrCreateUniqueId(user.uid);
          await user.getIdToken(true);
          console.log("Firebase ID token:", user.getIdToken());
          this.storeTokenAndUniqueIdInLocalStorage(user.getIdToken(), uniqueId);

          // Save user's GitHub username in Firestore
          const githubUsername = user.providerData[0].displayName;
          this.$router.push("/todo");
          await this.saveGithubUsernameToFirestore(user.uid, githubUsername);
          // Move this inside the if block
        }
      } catch (error) {
        console.error("Error signing in with Google:", error.message);
      }
    },
    async signInWithGithub() {
      try {
        const { user } = await signInWithPopup(
          firebaseAuth,
          firebaseGithubAuthProvider
        );
        if (user) {
          const uniqueId = this.getOrCreateUniqueId(user.uid);
          await user.getIdToken(true);
          console.log("Firebase ID token:", user.getIdToken());
          this.storeTokenAndUniqueIdInLocalStorage(user.getIdToken(), uniqueId);

          // Save user's GitHub username in Firestore
          const githubUsername = user.providerData[0].displayName;
          this.$router.push("/todo");
          await this.saveGithubUsernameToFirestore(user.uid, githubUsername);
          // Move this inside the if block
        }
      } catch (error) {
        console.error("Error signing in with GitHub:", error.message);
      }
    },
    getOrCreateUniqueId(uid) {
      const uniqueId = localStorage.getItem("uniqueId");
      if (uniqueId) {
        return uniqueId;
      } else {
        const newUniqueId = this.generateUniqueId();
        localStorage.setItem("uniqueId", newUniqueId);
        return newUniqueId;
      }
    },
    generateUniqueId() {
      // Generate a random unique ID here (you can use any method you prefer)
      return "UID_" + Math.random().toString(36).substr(2, 9);
    },
    storeTokenAndUniqueIdInLocalStorage(token, uniqueId) {
      localStorage.setItem("firebaseToken", token);
      localStorage.setItem("uniqueId", uniqueId);
    },
    async saveGithubUsernameToFirestore(uid, githubUsername) {
      try {
        const userDocRef = doc(db, "users", uid);
        await setDoc(userDocRef, { githubUsername }, { merge: true });
        console.log("GitHub username saved to Firestore.");
      } catch (error) {
        console.error(
          "Error saving GitHub username to Firestore:",
          error.message
        );
      }
    },
  },
};

// Check if authToken and uniqueId are present in localStorage
onMounted(() => {
  const firebaseToken = localStorage.getItem("firebaseToken");
  const uniqueId = localStorage.getItem("uniqueId");
  if (firebaseToken && uniqueId) {
    router.push("/todo"); // Redirect to '/todo' page if both firebaseToken and uniqueId are present
  }
});
</script>
