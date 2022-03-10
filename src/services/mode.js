import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const get = async (userEmail) => {
  const docRef = doc(db, "users", userEmail);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const mode = docSnap.data().mode;
    return mode;
  } else {
    return null;
  }
};

export const update = async (userEmail, mode) => {
  const docRef = doc(db, "users", userEmail);
  await setDoc(docRef, { mode });
};
