import { useCallback, useContext } from "react";
import { ModalContext } from "../../../providers";
import { ModeSelector } from "../../Modals";

export default function useModeSelectorModal(currentMode, onConfirm) {
  const { openModal } = useContext(ModalContext);

  const open = useCallback(
    () =>
      openModal(
        <ModeSelector currentMode={currentMode} onConfirm={onConfirm} />
      ),
    [openModal, currentMode, onConfirm]
  );

  return open;
}
