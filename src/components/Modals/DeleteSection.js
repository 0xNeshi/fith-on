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
          color="warning"
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
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
  gap: 10px;
`;
