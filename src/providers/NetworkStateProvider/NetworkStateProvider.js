import { createContext, useContext, useEffect, useState } from "react";
import { ModalContext } from "..";
import OfflineWarning from "./OfflineWarning";

function NetworkStateProvider({ children }) {
  const [isOffline, setOffline] = useState(window.navigator.onLine);
  const { openModal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    function handleOffline() {
      const modalContent = <OfflineWarning onConfirm={closeModal} />;
      openModal(modalContent);
      setOffline(true);
    }

    function handleOnline() {
      closeModal();
      setOffline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [closeModal, openModal]);

  return (
    <NetworkStateContext.Provider value={{ isOffline }}>
      {children}
    </NetworkStateContext.Provider>
  );
}

const NetworkStateContext = createContext({ isOffline: false });

export { NetworkStateProvider as default, NetworkStateContext };
