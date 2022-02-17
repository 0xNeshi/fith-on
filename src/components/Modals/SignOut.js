import { Box, styled } from "@mui/material";
import Button from "../Button";

export default function SignOut({ onSignOut, onClose }) {
  return (
    <Container>
      <h4>Are you sure you wish to sign out?</h4>
      <ButtonContainer>
        <Button color="primary" onClick={onClose} autoFocus>
          Cancel
        </Button>
        <Button color="secondary" onClick={onSignOut}>
          Sign out
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  width: 100%;
  gap: 15px;
  justify-content: center;
`;
