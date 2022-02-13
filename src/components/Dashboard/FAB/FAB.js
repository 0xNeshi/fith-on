import { FitnessCenter, Menu as MenuIcon, NoteAlt } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { Fab, styled } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext, useState } from "react";
import { NetworkStateContext, UserContext } from "../../../providers";
import FabMenu from "./FabMenu";

const MENU_ID = "account-menu";

export default function FAB(props) {
  const { onAddNote, onAddBlock, onSignOut, onSelectMode } = props;
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
        aria-controls={!!anchorEl ? MENU_ID : undefined}
        aria-expanded={!!anchorEl ? "true" : undefined}
        aria-haspopup="true"
        sx={{ width: 72, height: 72 }}
        color="secondary"
      >
        <Tooltip title="Actions">
          <MenuIcon fontSize="large" color="primary" />
        </Tooltip>
      </Fab>
      <FabMenu id={MENU_ID} anchorEl={anchorEl} onClick={handleClose}>
        <MenuItem>
          <Avatar src={user.photoURL} sx={{ bgcolor: "white" }} />
          <DisplayName>{user.displayName}</DisplayName>
        </MenuItem>
        <MenuItem onClick={onSelectMode}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Choose mode
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
      </FabMenu>
    </>
  );
}

const DisplayName = styled("span")`
  text-overflow: ellipsis,
  white-space: nowrap,
  overflow: hidden,
`;
