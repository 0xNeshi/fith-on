import { styled } from "@mui/material";
import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "./Note";

export default function Notes({ isVisible, notes, onUpdate }) {
  const handleAdd = useCallback(
    (newText) => {
      const updatedNotes = [...notes];
      updatedNotes.push({ id: uuidv4(), text: newText });
      onUpdate(updatedNotes);
    },
    [notes, onUpdate]
  );

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
          <Note onAdd={handleAdd} />
        </td>
      </Row>
    </>
  );
}

const Row = styled("tr")`
  width: 100%;
`;
