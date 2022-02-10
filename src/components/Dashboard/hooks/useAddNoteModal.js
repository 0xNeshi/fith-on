import { useCallback, useContext } from "react";
import { ModalContext } from "../../../providers";
import { AddNote } from "../../Modals";

export default function useAddNoteModal(add) {
  const { openModal, closeModal } = useContext(ModalContext);

  const open = useCallback(() => {
    const onSubmit = (noteData) => {
      const note = { ...noteData, type: "note" };
      add(note);
      closeModal();
    };

    const modalContent = <AddNote onSubmit={onSubmit} onClose={closeModal} />;
    openModal(modalContent);
  }, [openModal, closeModal, add]);

  return {
    open,
    close: closeModal,
  };
}
