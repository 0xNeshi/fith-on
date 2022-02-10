import { Button } from "@mui/material";
import styled from "styled-components";

export default function SignOut({ onSignOut, onClose }) {
  return (
    <Container>
      <h4>Are you sure you wish to sign out?</h4>
      <ButtonContainer>
        <Button
          type="button"
          variant="contained"
          onClick={onClose}
          color="primary"
        >
          Cancel
        </Button>
        <Button variant="outlined" color="warning" onClick={onSignOut}>
          Sign out
        </Button>
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
