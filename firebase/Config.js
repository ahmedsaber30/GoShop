// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWSV7IL4FxrVtpuW5-r4dOtXDNv33SYWY",
  authDomain: "canvas-genius-404705.firebaseapp.com",
  projectId: "canvas-genius-404705",
  storageBucket: "canvas-genius-404705.appspot.com",
  messagingSenderId: "613277010230",
  appId: "1:613277010230:web:b7ba362c6052f45cd40b97",
  measurementId: "G-HBGT0QW9WJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
