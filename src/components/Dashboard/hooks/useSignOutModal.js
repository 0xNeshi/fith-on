import { useCallback, useContext } from "react";
import { ModalContext } from "../../../providers";
import { signOut } from "../../../services/authService";
import { SignOut } from "../../Modals";

export default function useSignOutModal() {
  const { openModal, closeModal } = useContext(ModalContext);

  const open = useCallback(() => {
    const onSignOut = () => {
      closeModal();
      signOut();
    };
    const modalContent = <SignOut onSignOut={onSignOut} onClose={closeModal} />;
    openModal(modalContent);
  }, [openModal, closeModal]);

  return {
    open,
    close: closeModal,
  };
}
