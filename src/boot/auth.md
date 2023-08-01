import { onAuthStateChanged } from "firebase/auth";
import { Notify } from "quasar";
import { firebase } from "./firebase"; // Import your Firebase authentication instance here

export default ({ router }) => {
  // Add a listener to check for authentication state changes
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // If the user is authenticated, allow navigation to protected routes
      router.push("/todo");
    } else {
      // If the user is not authenticated, redirect to the login page or handle the authentication flow
      // Example: router.push('/login');
    }
  });

  // Optionally, you can set up global error handling for authentication errors
  // This will show a notification when there's an authentication error
  firebaseAuth.onAuthError((error) => {
    Notify.create({
      message: "Authentication Error: " + error.message,
      type: "negative",
    });
  });
};
