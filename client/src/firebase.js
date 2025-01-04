// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "turboreels-47a72.firebaseapp.com",
  projectId: "turboreels-47a72",
  storageBucket: "turboreels-47a72.firebasestorage.app",
  messagingSenderId: "1053754066277",
  appId: "1:1053754066277:web:9a0cdf4984b2300125cd8c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
