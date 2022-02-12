import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZsY69RGPAbwnEyps2Rm1NAl7_5W8jjf8",
  authDomain: "fith-on.firebaseapp.com",
  projectId: "fith-on",
  storageBucket: "fith-on.appspot.com",
  messagingSenderId: "73599164090",
  appId: "1:73599164090:web:5124fdd9d6b7791307ec83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
