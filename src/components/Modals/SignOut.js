import styled from "styled-components";
import Button from "../Button";

export default function SignOut({ onSignOut, onClose }) {
  return (
    <Container>
      <h4>Are you sure you wish to sign out?</h4>
      <ButtonContainer>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="warning" onClick={onSignOut} autoFocus>
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
