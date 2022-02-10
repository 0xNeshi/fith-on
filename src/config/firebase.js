import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdf-GlGOZMWTlSy5Dp1TIxUX5h2SY5Uxw",
  authDomain: "training-711ed.firebaseapp.com",
  projectId: "training-711ed",
  storageBucket: "training-711ed.appspot.com",
  messagingSenderId: "222988029466",
  appId: "1:222988029466:web:0950feb53f6d5bed3b8ba3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
