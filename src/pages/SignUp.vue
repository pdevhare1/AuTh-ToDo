<template>
  <div class="q-pa-md row items-start q-gutter-md absolute-center q-my-md">
    <q-card class="my-card">
      <q-card-section>
        <q-form class="q-pa-md" @submit="signUp">
          <div class="flex column q-gutter-sm text-center" style="width: 300px">
            <!-- Use v-model to bind input values to reactive variables -->
            <q-input v-model="name" type="text" label="Name" />
            <q-input v-model="email" type="email" label="Username *" />
            <q-input
              v-model="password"
              type="password"
              label="Password *"
              size="3rem"
            />
            <q-input
              v-model="confirmPassword"
              type="password"
              label="Confirm Password *"
              size="3rem"
            />
            <q-btn
              class="q-mt-lg"
              outline
              style="color: #21ba45"
              label="Sign Up"
              type="submit"
            />
            <p class="q-mt-lg text-bold">OR</p>
            <p class="text-bold">
              Already Have an Account?
              <router-link to="/">Sign in</router-link>
            </p>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Toast notification -->
    <q-toast
      position="top"
      :message="toastMessage"
      :color="toastColor"
      ref="toast"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async signUp() {
      // Password validation regular expressions
      const passwordRegex =
        /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

      if (!passwordRegex.test(this.password)) {
        alert(
          "Password must be 8 characters or longer with at least 2 symbols, 2 capital letters, and 2 small letters."
        );
        return;
      }

      if (this.password === this.confirmPassword) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password,
          authToken: this.generateAuthToken(), // Generate authToken for the user
        };

        try {
          // Send a POST request to Firebase Realtime Database
          await fetch(
            "https://myproject-bc18e-default-rtdb.firebaseio.com/users.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );

          // Redirect to the /todo page after successful sign-up
          this.$router.push("/todo");
        } catch (error) {
          console.error("Error creating user:", error);
        }
      } else {
        // Handle password mismatch error
        alert("Passwords do not match!");
      }
    },
    generateAuthToken() {
      // Function to generate a random authToken
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let authToken = "";
      for (let i = 0; i < 32; i++) {
        authToken += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return authToken;
    },
  },
};
</script>
