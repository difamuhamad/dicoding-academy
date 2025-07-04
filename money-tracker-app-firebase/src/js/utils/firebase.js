// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
/**
 * Ubahlah `xxxxx` dengan data konfigurasi proyek Firebase Anda
 */
const firebaseConfig = {
  apiKey: 'AIzaSyCVUaZwbrQqJ32kCNMUOT4_o--XKd4bO3E',
  authDomain: 'money-tracker-app-6a4c6.firebaseapp.com',
  projectId: 'money-tracker-app-6a4c6',
  storageBucket: 'money-tracker-app-6a4c6.firebasestorage.app',
  messagingSenderId: '17871291146',
  appId: '1:17871291146:web:1889ddb6a93121c7aff0f3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, auth, db, storage };
