import { useCallback, useContext } from "react";
import { ModalContext, UserContext } from "../../../providers";
import { signOut } from "../../../services/authService";
import { SignOut } from "../../Modals";

export default function useSignOutModal() {
  const { user } = useContext(UserContext);
  const { openModal, closeModal } = useContext(ModalContext);

  const open = useCallback(() => {
    const onSignOut = async () => {
      closeModal();
      await signOut(user.email);
    };
    const modalContent = <SignOut onSignOut={onSignOut} onClose={closeModal} />;
    openModal(modalContent);
  }, [openModal, closeModal, user.email]);

  return {
    open,
    close: closeModal,
  };
}
