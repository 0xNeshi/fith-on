import { useCallback, useContext } from "react";
import styled from "styled-components";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { NetworkStateContext } from "../providers";
import { styled as muiStyled } from "@mui/material";

export default function Section(props) {
  const { sectionId, title, onDeleteSection, children } = props;
  const { isOffline } = useContext(NetworkStateContext);

  const handleDeleteSection = useCallback(
    () => onDeleteSection(sectionId),
    [sectionId, onDeleteSection]
  );

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <DeleteIcon
          fontSize="large"
          color="primary"
          onClick={handleDeleteSection}
          disabled={isOffline}
        />
      </Header>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  background-color: #222;
  color: lightgrey;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h3`
  width: 100%;
  margin-right: 7px;
`;

const DeleteIcon = muiStyled(DeleteForeverOutlined)`
  ${({ disabled, theme }) =>
    disabled
      ? `cursor: auto; color: ${theme.palette.secondary.main}`
      : "cursor: pointer"}
`;
