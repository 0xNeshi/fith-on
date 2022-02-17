import { Box, Fade, styled } from "@mui/material";
import { useCallback, useContext, useMemo } from "react";
import { ModeContext } from "../../providers";
import {
  useAddBlockModal,
  useAddNoteModal,
  useModeSelectorModal,
  useSignOutModal,
} from "./hooks";
import { getNewBlockSuggestedValues } from "../../utilities";
import FAB from "./FAB";

export default function useFAB(sections, display, handleAddSection) {
  const { mode, setMode } = useContext(ModeContext);

  const handleSetMode = useCallback((newMode) => setMode(newMode), [setMode]);

  const { open: openAddNote } = useAddNoteModal(handleAddSection);
  const { open: openAddBlock } = useAddBlockModal(handleAddSection);
  const { open: openSignOut } = useSignOutModal();
  const openModeSelector = useModeSelectorModal(mode, handleSetMode);

  const handleOpenAddBlock = useCallback(() => {
    const suggestedValues = getNewBlockSuggestedValues(sections);
    openAddBlock(suggestedValues);
  }, [openAddBlock, sections]);

  return (
    <Fade in={display} unmountOnExit>
      <FABContainer>
        <FAB
          onAddNote={openAddNote}
          onAddBlock={handleOpenAddBlock}
          onSignOut={openSignOut}
          onSelectMode={openModeSelector}
        />
      </FABContainer>
    </Fade>
  );
}

const FABContainer = styled(Box)`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 2;
`;
