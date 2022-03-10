import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import logf from "./log";

export const get = async (userEmail) => {
  const docRef = doc(db, "users", userEmail);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const mode = docSnap.data().mode;
    logf(userEmail, "get (mode)", `Returned '${mode}' Mode`);
    return mode;
  } else {
    logf(userEmail, "get (mode)", `No mode saved, returning default`);
    return "dark";
  }
};

export const update = async (userEmail, mode) => {
  const docRef = doc(db, "users", userEmail);
  await setDoc(docRef, { mode });
  logf(userEmail, "update (mode)", `Update to ${mode} successful`);
};
