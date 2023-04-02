import { ModalUnstyled } from "@mui/base";
import { Box, styled } from "@mui/material";
import clsx from "clsx";
import * as React from "react";
import { createContext, useCallback, useState } from "react";

export const ModalContext = createContext({
  openModal: (content) => content,
  closeModal: () => {},
});

export function ModalProvider({ children }) {
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState();

  const openModal = useCallback((modalContent) => {
    setContent(modalContent);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <StyledModal
        open={isOpen}
        onClose={closeModal}
        slots={{ backdrop: Backdrop }}
      >
        <Box sx={style}>{content}</Box>
      </StyledModal>
    </ModalContext.Provider>
  );
}

const style = {
  maxWidth: 400,
  bgcolor: "background.default",
  p: 2,
  px: 3,
  pb: 3,
  marginRight: 3,
  marginLeft: 3,
};

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
