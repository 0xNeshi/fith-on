import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { usePersistentState } from "../hooks";

export default function UserProvider({ children }) {
  const [user, setUser] = usePersistentState("user");
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        setUser(null);
        return;
      }

      if (currentUser.uid !== user?.uid) {
        setUser(currentUser);
        setError("");
      }
    });

    return () => unsubscribe();
    // we should subscribe to these changes only when the app first runs
    // and unsubscribe when prior to it closing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, error }}>
      {children}
    </UserContext.Provider>
  );
}

const UserContext = createContext({ user: null, error: null });

export { UserContext };
