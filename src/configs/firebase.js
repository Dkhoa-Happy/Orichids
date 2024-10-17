// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwm5tmq2E3wTbpc4KAOqYx5_yIUyrfTR4",
  authDomain: "final-lab-af883.firebaseapp.com",
  projectId: "final-lab-af883",
  storageBucket: "final-lab-af883.appspot.com",
  messagingSenderId: "887972051468",
  appId: "1:887972051468:web:b9645a35a9f99657cd4c29",
  measurementId: "G-CZ0W6FZC7B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
