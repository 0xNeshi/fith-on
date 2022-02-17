import { useCallback, useContext } from "react";
import { Delete } from "@mui/icons-material";
import { NetworkStateContext } from "../providers";
import { Box, Button, styled, Typography } from "@mui/material";

export default function Section(props) {
  const { sectionId, title, onDeleteSection, dateCreated, children } = props;
  const { isOffline } = useContext(NetworkStateContext);

  const handleDeleteSection = useCallback(
    () => onDeleteSection(sectionId),
    [sectionId, onDeleteSection]
  );

  return (
    <Container>
      <Header>
        <Box sx={{}}>
          {title}
          <DateCreated>
            - {new Date(dateCreated).toLocaleDateString()}
          </DateCreated>
        </Box>
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

const Container = styled((props) => <Box sx={{ boxShadow: 3 }} {...props} />)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  background-color: ${theme.palette.background.default};
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
  ${({ disabled }) => (disabled ? `cursor: auto;` : "cursor: pointer")}
`;

const DateCreated = styled((props) => (
  <Typography variant="subtitle2" component="div" {...props} />
))`
  width: 100%;
  font-size: 0.8rem;
`;
