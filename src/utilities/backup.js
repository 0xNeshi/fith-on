import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function pushBackup(backup) {
  const docRef = await addDoc(collection(db, "backups"), backup);
  console.log("Added backup with ID: ", docRef);
}

export async function getSectionsFromBackup(userEmail) {
  const q = query(
    collection(db, "backups"),
    where("userEmail", "==", userEmail),
    orderBy("lastBackupTime", "desc"),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.docs?.length) {
    return [];
  }
  const data = extractData(snapshot.docs[0].data());
  return data;
}

function extractData(backup) {
  const stringifiedSections = Buffer.from(
    backup.base64Sections,
    "base64"
  ).toString("utf8");
  const sections = JSON.parse(stringifiedSections);

  return {
    sections,
    lastBackupTime: backup.lastBackupTime,
  };
}
