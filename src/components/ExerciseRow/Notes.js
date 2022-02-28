import { Add, Close } from "@mui/icons-material";
import { Box, Button, styled, TextField } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { ModeContext, NetworkStateContext } from "../../providers";
import { v4 as uuidv4 } from "uuid";

export default function Notes({ isVisible, notes, onUpdate }) {
  const { mode } = useContext(ModeContext);
  const { isOffline } = useContext(NetworkStateContext);
  const [newNote, setNewNote] = useState("");

  const handleAdd = useCallback(() => {
    const updatedNotes = [...notes];
    updatedNotes.push({ id: uuidv4(), text: newNote });
    setNewNote("");
    onUpdate(updatedNotes);
  }, [notes, onUpdate, newNote]);

  const handleRemove = useCallback(
    (noteId) => {
      const updatedNotes = [...notes].filter((note) => note.id !== noteId);
      onUpdate(updatedNotes);
    },
    [notes, onUpdate]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {notes
        .filter((note) => !!note?.id)
        .map((note) => (
          <Row key={note.id}>
            <td colSpan={6}>
              <NoteContainer>
                <NoteLabel>{note.text}</NoteLabel>
                <Button
                  color="primary"
                  disabled={isOffline}
                  onClick={() => handleRemove(note.id)}
                  sx={{ padding: "0 6px", minWidth: 0 }}
                >
                  <CloseIcon fontSize="small" />
                </Button>
              </NoteContainer>
            </td>
          </Row>
        ))}
      <Row>
        <td colSpan={6}>
          <NoteContainer>
            <StyledField
              variant="standard"
              FormHelperTextProps={{
                style: { fontSize: 12 },
              }}
              mode={mode}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <Button
              color="primary"
              disabled={isOffline}
              onClick={handleAdd}
              sx={{ padding: "0 6px", minWidth: 0 }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </NoteContainer>
        </td>
      </Row>
    </>
  );
}

const Row = styled("tr")`
  width: 100%;
`;

const NoteContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const StyledField = styled(TextField)(
  ({ theme }) => `
    width: 80%;

    & .MuiInput-underline:before {
      border-bottom: 1px solid ${theme.palette.primary.main};
    }`
);

const NoteLabel = styled(Box)`
  width: 80%;
`;

const AddIcon = styled(Add)`
  ${({ disabled }) => (disabled ? `cursor: auto;` : "cursor: pointer")}
`;

const CloseIcon = styled(Close)`
  ${({ disabled }) => (disabled ? `cursor: auto;` : "cursor: pointer")}
`;
