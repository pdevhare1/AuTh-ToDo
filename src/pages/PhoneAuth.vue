<template>
  <div class="q-pa-md row items-start q-gutter-md absolute-center q-my-md">
    <q-card class="my-card">
      <q-card-section>
        <q-form class="q-pa-md">
          <div class="flex column q-gutter-sm text-center" style="width: 300px">
            <q-input
              v-if="!otpSent"
              v-model="phoneNumber"
              mode="international"
              label="Phone Number *"
            ></q-input>
            <q-input v-if="otpSent" v-model="otp" label="Enter OTP *" />
            <div id="recaptcha-container"></div>
            <!-- reCAPTCHA container -->
            <p class="text-red text-bold">
              enter +91* only Indian numbers are accepted.
            </p>
            <q-btn
              v-if="!otpSent"
              outline
              style="color: #1976d2"
              label="Send OTP"
              @click="sendOtp"
            />
            <q-btn
              v-else
              outline
              style="color: #1976d2"
              label="Verify OTP"
              @click="verifyOtp"
            />
            <q-btn
              v-if="otpSent"
              outline
              style="color: #1976d2"
              label="Resend OTP"
              @click="resendOtp"
            />
            <p class="q-mt-lg text-bold">OR</p>
            <p class="text-bold q-mt-lg">
              Sign in Using Different Methods
              <router-link to="/"> Sign in </router-link>
            </p>
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
import firebase from "../boot/firebase";

export default {
  data() {
    return {
      otpSent: false,
      phoneNumber: "",
      otp: "",
    };
  },
  methods: {
    sendOtp() {
      const phoneNumber = `+${this.phoneNumber}`;
      const appVerifier = window.appVerifier;

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // OTP sent successfully
          this.otpSent = true;
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
        });
    },
    verifyOtp() {
      const code = this.otp;
      const confirmationResult = window.confirmationResult;

      confirmationResult
        .confirm(code)
        .then((result) => {
          // Phone number verified successfully
          console.log("Phone number verified:", result.user);
          this.showNotification(
            "Phone number verified successfully!",
            "positive"
          );
          this.$router.push("/todo");
        })
        .catch((error) => {
          console.error("Error verifying OTP:", error);
        });
    },
    resendOtp() {
      this.sendOtp();
    },
    showNotification(message, type) {
      this.$q.notify({
        message: message,
        type: type,
        position: "top",
        timeout: 2000,
      });
    },
  },
  mounted() {
    // Wait for the component to be mounted before initializing Firebase and reCAPTCHA
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );

    // Attach the reCAPTCHA verifier to the window object so it can be accessed in other methods
    window.appVerifier = appVerifier;

    console.log("Firebase and reCAPTCHA initialized.");
  },
};
</script>
