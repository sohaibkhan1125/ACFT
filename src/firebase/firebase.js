/**
 * Firebase Configuration and Initialization
 * Single source of truth for Firebase setup
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCdJePTk4t5nph0ktTD5nGX2Ixcqxg2pk",
  authDomain: "acft-calculator-7ef88.firebaseapp.com",
  projectId: "acft-calculator-7ef88",
  storageBucket: "acft-calculator-7ef88.firebasestorage.app",
  messagingSenderId: "48610168725",
  appId: "1:48610168725:web:a6501bf931f7f162adf09c",
  measurementId: "G-9DJVH9DRQP"
};

// Initialize Firebase
let app;
let db;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // Initialize Analytics only in production or when explicitly enabled
  if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENABLE_ANALYTICS === 'true') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('Analytics initialization failed:', error.message);
    }
  }
} catch (error) {
  console.error('Firebase initialization failed:', error.message);
  // Provide fallback objects to prevent crashes
  app = null;
  db = null;
  analytics = null;
}

// Export Firebase instances
export { app, db, analytics };

// Export individual Firebase functions
export { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot, 
  updateDoc, 
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore
} from 'firebase/firestore';

// Export Firebase app for other uses
export default app;
