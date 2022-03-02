import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const logf = async (userEmail, action, message) => {
  await addDoc(collection(db, "logs"), {
    userEmail,
    action,
    message,
    timestamp: new Date().toLocaleDateString("en-GB"),
  });
};

export default logf;
