// src/boot/firebase.js
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXnzTqvVhBlJlZUTauc-5dY6DIIkJv3g4",
  authDomain: "myproject-bc18e.firebaseapp.com",
  databaseURL: "https://myproject-bc18e-default-rtdb.firebaseio.com",
  projectId: "myproject-bc18e",
  storageBucket: "myproject-bc18e.appspot.com",
  messagingSenderId: "153215190685",
  appId: "1:153215190685:web:77b7c5c9f8093034393674",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
