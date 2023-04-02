import { Add, Close } from "@mui/icons-material";
import { Box, Button, styled, TextField } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ModeContext } from "../../providers";
import { InteractibleContext } from "../Dashboard/Dashboard";
import Note from "./Note";

export default function Notes({ isVisible, notes, onUpdate }) {
  const { mode } = useContext(ModeContext);
  const isInteractible = useContext(InteractibleContext);
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

  const handleUpdate = useCallback(
    (noteId, newText) => {
      const updatedNotes = [...notes].filter((note) => note.id !== noteId);
      updatedNotes.push({ id: noteId, text: newText });
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
              <Note
                note={note}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
              />
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
              disabled={!isInteractible}
            />
            <Button
              color="primary"
              disabled={!isInteractible}
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
    
    & .MuiInput-input {
      text-align: center;
    }

    & .MuiInput-underline:before {
      border-bottom: 1px solid ${theme.palette.primary.main};
    }`
);

const AddIcon = styled(Add)`
  ${({ disabled }) => (disabled ? `cursor: auto;` : "cursor: pointer")}
`;

const CloseIcon = styled(Close)`
  ${({ disabled }) => (disabled ? `cursor: auto;` : "cursor: pointer")}
`;
