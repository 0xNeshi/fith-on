import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ModalContext, SectionsContext } from "..";
import OfflineWarning from "./OfflineWarning";

export function NetworkStateProvider({ children }) {
  const [isOffline, setOffline] = useState(!window.navigator.onLine);
  const { openModal, closeModal } = useContext(ModalContext);
  const { refetch } = useContext(SectionsContext);

  const handleOffline = useCallback(() => {
    const modalContent = <OfflineWarning onConfirm={closeModal} />;
    openModal(modalContent);
    if (!isOffline) {
      setOffline(true);
    }
  }, [closeModal, openModal, isOffline]);

  const handleOnline = useCallback(() => {
    refetch();
    closeModal();
    setOffline(false);
    alert("Back online");
  }, [closeModal, refetch]);

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

export const NetworkStateContext = createContext({ isOffline: false });
