import { FitnessCenter, Menu as MenuIcon, NoteAlt } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useContext, useState } from "react";
import styled from "styled-components";
import { NetworkStateContext, UserContext } from "../../providers";

export default function FAB(props) {
  const { onAddNote, onAddBlock, onSignOut } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(UserContext);
  const { isOffline } = useContext(NetworkStateContext);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Actions">
          <Button
            onClick={handleClick}
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              boxShadow: "2px 3px 6px #000",
            }}
            aria-controls={!!anchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={!!anchorEl ? "true" : undefined}
            variant="contained"
            color="primary"
          >
            <MenuIcon fontSize="large" />
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              bottom: -15,
              right: 25,
              width: 15,
              height: 15,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem>
          <Avatar src={user.photoURL} />
          <DisplayName>{user.displayName}</DisplayName>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onAddBlock} disabled={isOffline}>
          <ListItemIcon>
            <FitnessCenter />
          </ListItemIcon>
          Add block
        </MenuItem>
        <MenuItem onClick={onAddNote} disabled={isOffline}>
          <ListItemIcon>
            <NoteAlt />
          </ListItemIcon>
          Add note
        </MenuItem>
        <Divider />
        <MenuItem onClick={onSignOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}

const DisplayName = styled.span`
  text-overflow: ellipsis,
  white-space: nowrap,
  overflow: hidden,
`;
