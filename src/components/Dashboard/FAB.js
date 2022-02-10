import { FitnessCenter, Menu as MenuIcon, NoteAdd } from "@mui/icons-material";
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
import { UserContext } from "../../providers";

export default function FAB(props) {
  const { onAddNote, onAddBlock, onSignOut } = props;
  const { user } = useContext(UserContext);

  console.log(user);

  const [anchorEl, setAnchorEl] = useState(null);
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
            color="secondary"
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
            width: 220,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem>
          <Avatar />
          <p
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: 210,
            }}
          >
            {user.displayName}
          </p>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ fontSize: 20 }} onClick={onAddBlock}>
          <ListItemIcon>
            <FitnessCenter />
          </ListItemIcon>
          Add block
        </MenuItem>
        <MenuItem onClick={onAddNote}>
          <ListItemIcon>
            <NoteAdd />
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
