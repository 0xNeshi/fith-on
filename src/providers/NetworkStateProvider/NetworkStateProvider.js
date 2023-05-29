import { createContext, useCallback, useEffect, useState } from "react";

export function NetworkStateProvider({ children }) {
  const [isOffline, setOffline] = useState(!window.navigator.onLine);
  const [onOnlineFuncs, setOnOnlineFuncs] = useState([]);

  const handleOffline = useCallback(() => {
    if (!isOffline) {
      setOffline(true);
    }
  }, [isOffline]);

  const handleOnline = useCallback(() => {
    onOnlineFuncs.forEach(func => func());
    setOffline(false);
  }, [onOnlineFuncs]);

  // Check if offline on first app load
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

  const setOnOnline = useCallback((onOnline) => setOnOnlineFuncs(prev => [...prev, onOnline]), [])
  
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
