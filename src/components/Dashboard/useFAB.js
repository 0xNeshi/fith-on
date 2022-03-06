import { Box, Fade, styled } from "@mui/material";
import { useCallback, useContext } from "react";
import { ModeContext } from "../../providers";
import { getNewBlockSuggestedValues } from "../../utilities";
import FAB from "./FAB";
import {
  useAddBlockModal,
  useAddNoteModal,
  useModeSelectorModal,
  useSignOutModal,
} from "./hooks";

export default function useFAB(sections, display, handleAddSection) {
  const { mode, setMode, saveMode } = useContext(ModeContext);

  const handleSetMode = (newMode) => setMode(newMode);
  const handleSaveMode = (newMode) => saveMode(newMode);

  const { open: openAddNote } = useAddNoteModal(handleAddSection);
  const { open: openAddBlock } = useAddBlockModal(handleAddSection);
  const { open: openSignOut } = useSignOutModal();
  const openModeSelector = useModeSelectorModal(
    mode,
    handleSetMode,
    handleSaveMode
  );

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
