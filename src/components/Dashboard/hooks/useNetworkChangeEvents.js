import { useContext, useEffect } from "react";
import { ModalContext } from "../../../providers";
import { OfflineWarning } from "../../Modals";

export default function useNetworkChangeEvents() {
  const { openModal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    function openWarningModal() {
      const modalContent = <OfflineWarning onConfirm={closeModal} />;
      openModal(modalContent);
    }

    function alertBackOnline() {
      alert("Back online");
      closeModal();
    }

    window.addEventListener("online", alertBackOnline);
    window.addEventListener("offline", openWarningModal);

    return () => {
      window.removeEventListener("online", alertBackOnline);
      window.removeEventListener("offline", openWarningModal);
    };
  }, [closeModal, openModal]);
}
