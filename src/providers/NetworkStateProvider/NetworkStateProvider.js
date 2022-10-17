import { createContext, useCallback, useEffect, useState } from "react";

export function NetworkStateProvider({ children }) {
  const [isOffline, setOffline] = useState(!window.navigator.onLine);
  const [onOnline, setOnOnline] = useState(() => {});

  const handleOffline = useCallback(() => {
    if (!isOffline) {
      setOffline(true);
    }
    alert(
      "You are in offline mode and will be unable to interact with the app"
    );
  }, [isOffline]);

  const handleOnline = useCallback(() => {
    onOnline();
    setOffline(false);
    alert("Back online");
  }, [onOnline]);

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

  return (
    <NetworkStateContext.Provider value={{ isOffline, setOnOnline }}>
      {children}
    </NetworkStateContext.Provider>
  );
}

export const NetworkStateContext = createContext({
  isOffline: false,
  setOnOnline: () => {},
});
