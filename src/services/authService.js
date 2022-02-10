import { signInWithPopup, signOut as _signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

export function signInWithGoogle() {
  if (!window.navigator.onLine) {
    alert("Please check your internet connection");
    return;
  }
  return signInWithPopup(auth, googleProvider);
}

export function signOut() {
  _signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.log(error);
    });
}
