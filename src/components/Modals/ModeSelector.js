import {
  Box,
  FormControl,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { MODES } from "../../providers";
import { useState } from "react";

export default function ModeSelector({ currentMode, onConfirm }) {
  const [mode, setMode] = useState(currentMode);

  const handleOnChange = (event) => {
    setMode(event.target.value);
    onConfirm(event.target.value);
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
    </Container>
  );
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;
