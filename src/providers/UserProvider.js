import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export default function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setLoading(false);
      setUser(currentUser);
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
