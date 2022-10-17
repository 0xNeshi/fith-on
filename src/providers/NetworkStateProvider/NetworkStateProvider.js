import { createContext, useCallback, useEffect, useState } from "react";

export function NetworkStateProvider({ children }) {
  const [isOffline, setOffline] = useState(!window.navigator.onLine);
  const [onOnlineFuncs, setOnOnlineFuncs] = useState([]);

  const handleOffline = useCallback(() => {
    if (!isOffline) {
      setOffline(true);
    }
    alert(
      "You are in offline mode and will be unable to interact with the app"
    );
  }, [isOffline]);

  const handleOnline = useCallback(() => {
    onOnlineFuncs.forEach(func => func());
    setOffline(false);
    alert("Back online");
  }, [onOnlineFuncs]);

  useEffect(() => {
    if (isOffline) {
      handleOffline();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  const setOnOnline = useCallback((onOnline) => setOnOnlineFuncs(prev => [...prev, onOnline]))
  
  return (
    <NetworkStateContext.Provider value={{ isOffline, setOnOnline }}>
      {children}
    </NetworkStateContext.Provider>
  );
}

export const NetworkStateContext = createContext({
  isOffline: false,
  setOnOnline: (_func) => {},
});
