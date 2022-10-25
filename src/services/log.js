import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const logf = async (userEmail, action, message) => {
  if (!userEmail) {
    console.log("logf: userEmail is undefined/null at ", action);
    await addDoc(collection(db, "logs"), {
      action: "logf",
      message: `userEmail is undefined/null at ${action}`,
      timestamp: new Date().toLocaleDateString("en-GB"),
    });
  }

  await addDoc(collection(db, "logs"), {
    userEmail,
    action,
    message,
    timestamp: new Date().toLocaleDateString("en-GB"),
  });
};

export default logf;
