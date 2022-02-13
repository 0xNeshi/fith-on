import Menu from "@mui/material/Menu";

export default function FabMenu(props) {
  return (
    <Menu
      anchorEl={props.anchorEl}
      id={props.id}
      open={!!props.anchorEl}
      onClose={props.onClick}
      onClick={props.onClick}
      PaperProps={PAPER_PROPS}
      transformOrigin={{ horizontal: "right", vertical: "bottom" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      {props.children}
    </Menu>
  );
}

const PAPER_PROPS = {
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
};
