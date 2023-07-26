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

  <script>
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
          if (localStorage.getItem("authToken")) {
            alert("You are already logged in.");
            return;
          }
          const response = await fetch(
            `https://myproject-bc18e-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${this.email}"`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const userData = await response.json();
          const users = Object.values(userData);
          const user = users.find((u) => u.password === this.password);

          if (user) {
            if (user.authToken) {
              localStorage.setItem("authToken", user.authToken);

              this.$router.push("/todo");
            } else {
              alert("Authentication failed. Please try again.");
            }
          } else {
            alert("Invalid email or password. Please try again.");
          }
        } catch (error) {
          console.error("Error signing in:", error);
        }
      },
      verifyAuthToken(authToken) {
        const storedAuthToken = localStorage.getItemItem("authToken");
        return authToken === storedAuthToken;
      },
    },
  };
  </script>
