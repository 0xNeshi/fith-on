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

export async function signOut(userEmail) {
  try {
    await _signOut(auth);
  } catch (error) {
    await logf(userEmail, "signOut", error);
    alert("Error signing out");
  }
}
