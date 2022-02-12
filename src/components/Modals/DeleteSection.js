import { Button } from "@mui/material";
import styled from "styled-components";

export default function DeleteSection(props) {
  const { onClose, onConfirm } = props;

  return (
    <Container>
      <h4>Confirm deletion</h4>
      <ButtonContainer>
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          color="primary"
        >
          Cancel
        </Button>
        <Button variant="contained" color="warning" onClick={onConfirm}>
          Delete
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
