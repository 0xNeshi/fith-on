import { Add, Close, NoteAlt } from "@mui/icons-material";
import { Box, Button, styled, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { ModeContext } from "../../providers";
import { InteractibleContext } from "../Dashboard/Dashboard";

export default function Note({ note, onAdd, onRemove, onUpdate }) {
  const { mode } = useContext(ModeContext);
  const { isInteractible, setInputting } = useContext(InteractibleContext);
  const [text, setText] = useState(note?.text ?? "");

  return (
    <NoteContainer>
      <StyledField
        variant="standard"
        FormHelperTextProps={{
          style: { fontSize: 12 },
        }}
        mode={mode}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setInputting(true)}
        onBlur={() => setInputting(false)}
        disabled={!isInteractible}
      />
      {!note ? (
        <Button
          color="primary"
          disabled={!isInteractible}
          onClick={() => {
            onAdd(text);
            setText("");
          }}
          sx={{ padding: "0 6px", minWidth: 0 }}
        >
          <AddIcon fontSize="small" />
        </Button>
      ) : (
        <>
          <Button
            color="primary"
            disabled={!isInteractible || !text}
            onClick={() => onUpdate(note.id, text)}
            sx={{ padding: "0 6px", minWidth: 0 }}
          >
            <UpdateIcon fontSize="small" />
          </Button>
          <Button
            color="primary"
            disabled={!isInteractible}
            onClick={() => onRemove(note.id)}
            sx={{ padding: "0 6px", minWidth: 0 }}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </>
      )}
    </NoteContainer>
  );
}

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

const UpdateIcon = styled(NoteAlt)`
  ${({ disabled }) => (disabled ? `cursor: auto;` : "cursor: pointer")}
`;
