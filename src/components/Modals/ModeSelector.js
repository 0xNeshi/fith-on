import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { MODES } from "../../providers";
import { useState } from "react";

export default function ModeSelector({ currentMode, onChange, onConfirm }) {
  const [mode, setMode] = useState(currentMode);

  const handleOnChange = (event) => {
    setMode(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Container>
      <Typography variant="subtitle1" component="div">
        Choose mode below
      </Typography>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={mode}
          onChange={handleOnChange}
          label="Mode"
          color="secondary"
          autoFocus
        >
          {Object.keys(MODES).map((modeOption) => (
            <MenuItem key={modeOption} value={MODES[modeOption]}>
              {MODES[modeOption]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => onConfirm(mode)}
      >
        Confirm
      </StyledButton>
    </Container>
  );
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const StyledButton = styled(Button)`
  max-width: 9rem;
  width: 70%;
  margin-top: 20px;
`;
