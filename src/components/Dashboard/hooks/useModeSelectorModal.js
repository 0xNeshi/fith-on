import { useCallback, useContext } from "react";
import { ModalContext } from "../../../providers";
import { ModeSelector } from "../../Modals";

export default function useModeSelectorModal() {
  const { openModal } = useContext(ModalContext);

  const open = useCallback(() => openModal(<ModeSelector />), [openModal]);

  return open;
}
