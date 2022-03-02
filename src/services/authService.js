import { signInWithPopup, signOut as _signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import logf from "./log";

export function signInWithGoogle() {
  if (!window.navigator.onLine) {
    alert("Please check your internet connection");
    return;
  }
  return signInWithPopup(auth, googleProvider);
}

export function signOut(userEmail) {
  _signOut(auth)
    .then(() => {
      logf(userEmail, "signOut", "Signed out");
    })
    .catch((error) => {
      logf(userEmail, "signOut", error);
    });
}
