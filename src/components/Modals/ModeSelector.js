import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { MODES } from "../../providers";

export default function ModeSelector({ currentMode, onConfirm }) {
  const handleOnChange = (event) => {
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
          value={currentMode}
          onChange={handleOnChange}
          label="Mode"
          color="secondary"
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
  gap: 20px;
  align-items: center;
  padding: 20px 0;
`;
