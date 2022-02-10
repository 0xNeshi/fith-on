import { useCallback, useContext } from "react";
import { ModalContext } from "../../../providers";
import { DeleteSection } from "../../Modals";

export default function useRemoveSectionModal(remove) {
  const { openModal, closeModal } = useContext(ModalContext);

  const open = useCallback(
    (sectionId) => {
      const content = (
        <DeleteSection
          onClose={closeModal}
          onConfirm={() => {
            remove(sectionId);
            closeModal();
          }}
        />
      );
      openModal(content);
    },
    [openModal, closeModal, remove]
  );

  return {
    open,
    close: closeModal,
  };
}
