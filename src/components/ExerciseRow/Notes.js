import { Add, Delete } from "@mui/icons-material";
import { Box, styled, TextField } from "@mui/material";
import React, { useContext } from "react";
import { ModeContext } from "../../providers";

export default function Notes({ isVisible, notes }) {
  const { mode } = useContext(ModeContext);

  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      {notes.map((note) => (
        <td colSpan={6}>some content {note}</td>
      ))}
      <td colSpan={6}>
        <NoteContainer>
          <StyledField
            variant="standard"
            FormHelperTextProps={{
              style: { fontSize: 12 },
            }}
            mode={mode}
          />
          <Add fontSize="small" color="primary" />
          <Delete fontSize="small" color="secondary" />
        </NoteContainer>
      </td>
    </Container>
  );
}

const Container = styled("tr")`
  width: 100%;
  background-color: grey;
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
