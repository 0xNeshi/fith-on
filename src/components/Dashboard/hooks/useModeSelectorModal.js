import { useCallback, useContext } from "react";
import { ModalContext } from "../../../providers";
import { ModeSelector } from "../../Modals";

export default function useModeSelectorModal(currentMode, onChange, onConfirm) {
  const { openModal, closeModal } = useContext(ModalContext);

  const open = useCallback(() => {
    const handleConfirm = (newMode) => {
      onConfirm(newMode);
      closeModal();
    };

    openModal(
      <ModeSelector
        currentMode={currentMode}
        onChange={onChange}
        onConfirm={handleConfirm}
      />
    );
  }, [openModal, closeModal, currentMode, onConfirm]);

  return open;
}
