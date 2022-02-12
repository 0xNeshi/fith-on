import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export default function UserProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!user || currentUser === undefined || currentUser?.uid !== user.uid) {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

const UserContext = createContext({ user: null, isLoading: true });

export { UserContext };
