// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjw-Kt6hBK_4GuSWfvFg2fQp_XUIRSauw",
  authDomain: "mindcare-ai-4dc80.firebaseapp.com",
  projectId: "mindcare-ai-4dc80",
  storageBucket: "mindcare-ai-4dc80.firebasestorage.app",
  messagingSenderId: "880796024097",
  appId: "1:880796024097:web:175003e18f66161bcbd260",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();