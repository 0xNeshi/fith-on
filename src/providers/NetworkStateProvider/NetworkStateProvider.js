import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ModalContext } from "..";
import OfflineWarning from "./OfflineWarning";

function NetworkStateProvider({ children }) {
  const [isOffline, setOffline] = useState(!window.navigator.onLine);
  const { openModal, closeModal } = useContext(ModalContext);

  const handleOffline = useCallback(() => {
    const modalContent = <OfflineWarning onConfirm={closeModal} />;
    openModal(modalContent);
    if (!isOffline) {
      setOffline(true);
    }
  }, [closeModal, openModal, isOffline]);

  const handleOnline = useCallback(() => {
    closeModal();
    setOffline(false);
    alert("Back online");
  }, [closeModal]);

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
    <NetworkStateContext.Provider value={{ isOffline }}>
      {children}
    </NetworkStateContext.Provider>
  );
}

const NetworkStateContext = createContext({ isOffline: false });

export { NetworkStateProvider as default, NetworkStateContext };
