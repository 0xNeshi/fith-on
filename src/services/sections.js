import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const usersCollection = "users";
const sectionsCollection = "sections";

const getSectionsCollection = (userEmail) =>
  collection(db, usersCollection, userEmail, sectionsCollection);

export const getSections = async (userEmail) => {
  const snapshot = await getDocs(getSectionsCollection(userEmail));

  const sections = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return sections;
};

export const addSection = async (userEmail, section) => {
  const docRef = await addDoc(
    collection(db, usersCollection, userEmail, sectionsCollection),
    section
  );
  console.log("Document written with ID: ", docRef);
};

export const removeSection = async (userEmail, sectionId) => {
  await deleteDoc(doc(getSectionsCollection(userEmail), sectionId));
  console.log("Deleted document with ID: ", sectionId);
};

export const updateSection = async (userEmail, section) => {
  const blockRef = doc(getSectionsCollection(userEmail), section.id);

  const { id, ...sectionFields } = section;
  await setDoc(blockRef, sectionFields);
  console.log("Updated document with ID: ", section.id);
};
