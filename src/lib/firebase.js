import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzdfeH3y83ZxKWZrxzKw9iHi7AXP6NkBU",
  authDomain: "viralniche-7f86a.firebaseapp.com",
  projectId: "viralniche-7f86a",
  storageBucket: "viralniche-7f86a.firebasestorage.app",
  messagingSenderId: "922040564237",
  appId: "1:922040564237:web:e1420ea2a2b6f458bcb344",
  measurementId: "G-48N02WRJ4N"
};

// Initialize Firebase with error handling
let app;
let auth;
let db;
let analytics = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Initialize Analytics only on client side
  if (typeof window !== 'undefined') {
    // Dynamically import analytics to avoid SSR issues
    import('firebase/analytics').then(({ getAnalytics }) => {
      try {
        analytics = getAnalytics(app);
      } catch (analyticsError) {
        console.warn('Analytics initialization failed:', analyticsError);
      }
    }).catch(err => {
      console.warn('Analytics module import failed:', err);
    });
  }
} catch (firebaseError) {
  console.error('Firebase initialization error:', firebaseError);
}

export { auth, db, analytics };