import { createContext, useContext, useEffect, useState } from "react";
import { ModalContext } from "..";
import OfflineWarning from "./OfflineWarning";

function NetworkStateProvider({ children }) {
  const [isOnline, setOnline] = useState(true);
  const { openModal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    function handleOffline() {
      const modalContent = <OfflineWarning onConfirm={closeModal} />;
      openModal(modalContent);
      setOnline(false);
    }

    function handleOnline() {
      alert("Back online");
      closeModal();
      setOnline(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [closeModal, openModal]);

  return (
    <NetworkStateContext.Provider value={{ isOnline }}>
      {children}
    </NetworkStateContext.Provider>
  );
}

const NetworkStateContext = createContext({ isOnline: true });

export { NetworkStateProvider as default, NetworkStateContext };
