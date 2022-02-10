import { Button } from "@mui/material";
import styled from "styled-components";

export default function OfflineWarning({ onConfirm }) {
  return (
    <Container>
      <h4>
        You are in offline mode and will be unable to interact with the app
      </h4>
      <ButtonContainer>
        <StyledButton variant="contained" color="primary" onClick={onConfirm}>
          I Understand
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
  max-width: 9rem;
  width: 70%;
`;
