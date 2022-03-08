import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import logf from "../services/log";
import { get } from "../services/mode";

export default function UserProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!user || currentUser === undefined || currentUser?.uid !== user.uid) {
        if (!!currentUser) {
          logf(currentUser.email, "onAuthStateChanged", "Signed in");
          get(currentUser.email);
        }
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

const UserContext = createContext({ user: null, isLoading: true });

export { UserContext };
