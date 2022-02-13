import { FitnessCenter, Menu as MenuIcon, NoteAlt } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { Button, Fab, styled } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useContext, useState } from "react";
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
      <Fab
        aria-label="actions"
        onClick={handleClick}
        aria-controls={!!anchorEl ? "account-menu" : undefined}
        aria-expanded={!!anchorEl ? "true" : undefined}
        aria-haspopup="true"
        sx={{ width: 72, height: 72 }}
        color="secondary"
      >
        <Tooltip title="Actions">
          <MenuIcon fontSize="large" color="primary" />
        </Tooltip>
      </Fab>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: "secondary.main",
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
              bgcolor: "secondary.main",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem>
          <Avatar src={user.photoURL} sx={{ bgcolor: "white" }} />
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

const DisplayName = styled("span")`
  text-overflow: ellipsis,
  white-space: nowrap,
  overflow: hidden,
`;
