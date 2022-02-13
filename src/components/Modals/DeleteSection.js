import styled from "styled-components";
import Button from "../Button";

export default function DeleteSection(props) {
  const { onClose, onConfirm } = props;

  return (
    <Container>
      <h4>Confirm deletion</h4>
      <ButtonContainer>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onConfirm} autoFocus>
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
  gap: 15px;
`;
