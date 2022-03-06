import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import logf from "./log";

const usersCollection = "users";
const sectionsCollection = "sections";

const getSectionsCollection = (userEmail) =>
  collection(db, usersCollection, userEmail, sectionsCollection);

export const getSections = async (userEmail) => {
  const snapshot = await getDocs(getSectionsCollection(userEmail));
  const sections = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  logf(userEmail, "getSections", `Returned ${sections.length} sections`);
  return sections;
};

export const addSection = async (userEmail, section) => {
  const docRef = await addDoc(
    collection(db, usersCollection, userEmail, sectionsCollection),
    section
  );
  logf(userEmail, "addSection", "Document written with ID: ", docRef);
};

export const removeSection = async (userEmail, sectionId) => {
  await deleteDoc(doc(getSectionsCollection(userEmail), sectionId));
  logf(userEmail, "removeSection", `Removed section with ID: ${sectionId}`);
};

export const updateSection = async (userEmail, { id, ...sectionFields }) => {
  await setDoc(doc(getSectionsCollection(userEmail), id), sectionFields);
  logf(userEmail, "updateSection", `Updated section with ID: ${id}`);
};
