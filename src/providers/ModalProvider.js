import { createContext, useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const ModalContext = createContext({
  openModal: (content) => content,
  closeModal: () => {},
});

export default function ModalProvider({ children }) {
  const [overlayRef, setOverlayRef] = useState();
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState();

  const openModal = useCallback((modalContent) => {
    setContent(modalContent);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (overlayRef?.style) {
      overlayRef.style.zIndex = 3;
    }
  }, [overlayRef?.style]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ReactModal
        isOpen={isOpen}
        overlayRef={(ref) => setOverlayRef(ref)}
        onRequestClose={() => closeModal()}
        style={modalStyle}
      >
        {content}
      </ReactModal>
    </ModalContext.Provider>
  );
}

export { ModalContext };

const modalStyle = {
  content: {
    height: "fit-content",
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "#222",
    borderRadius: "3px",
    border: "0",
  },
  overlay: {
    backgroundColor: "rgba(22, 22, 22, 0.75)",
  },
};
