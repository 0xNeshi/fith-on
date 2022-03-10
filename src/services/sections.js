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

export const addSection = async (userEmail, section) =>
  await addDoc(
    collection(db, usersCollection, userEmail, sectionsCollection),
    section
  );

export const removeSection = async (userEmail, sectionId) =>
  await deleteDoc(doc(getSectionsCollection(userEmail), sectionId));

export const updateSection = async (userEmail, { id, ...sectionFields }) =>
  await setDoc(doc(getSectionsCollection(userEmail), id), sectionFields);
