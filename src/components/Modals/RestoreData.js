import { Button } from "@mui/material";
import styled from "styled-components";

export default function RestoreData({ onConfirm, onClose }) {
  return (
    <Container>
      <h4>Do you want to restore your data from the backup?</h4>
      <ButtonContainer>
        <StyledButton
          type="button"
          variant="outlined"
          onClick={onClose}
          color="warning"
        >
          No
        </StyledButton>
        <StyledButton variant="contained" color="primary" onClick={onConfirm}>
          Yes
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const StyledButton = styled(Button)`
  max-width: 6rem;
  width: 40%;
`;
