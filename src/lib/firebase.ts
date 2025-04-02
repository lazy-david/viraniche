import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzdfeH3y83ZxKWZrxzKw9iHi7AXP6NkBU",
  authDomain: "viralniche-7f86a.firebaseapp.com",
  projectId: "viralniche-7f86a",
  storageBucket: "viralniche-7f86a.firebasestorage.app",
  messagingSenderId: "922040564237",
  appId: "1:922040564237:web:e1420ea2a2b6f458bcb344",
  measurementId: "G-48N02WRJ4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);

export { app, analytics, auth }; 