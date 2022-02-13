import { useCallback, useContext } from "react";
import { Delete } from "@mui/icons-material";
import { NetworkStateContext } from "../providers";
import { Box, Button, styled, Typography } from "@mui/material";

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
        {title}
        <Button
          color="primary"
          disabled={isOffline}
          onClick={handleDeleteSection}
          sx={{ padding: "0 6px", minWidth: 0 }}
        >
          <DeleteIcon fontSize="medium" />
        </Button>
      </Header>
      {children}
    </Container>
  );
}

const Container = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  background-color: ${theme.palette.background.default};
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 
    0px 3px 4px 0px rgb(0 0 0 / 14%), 
    0px 1px 8px 0px rgb(0 0 0 / 12%);
`
);

const Header = styled((props) => (
  <Typography variant="subtitle1" component="div" {...props} />
))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DeleteIcon = styled(Delete)`
  ${({ disabled, theme }) => (disabled ? `cursor: auto;` : "cursor: pointer")}
`;
