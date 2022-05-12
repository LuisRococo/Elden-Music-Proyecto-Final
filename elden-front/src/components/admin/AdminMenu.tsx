import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { hide } from "../../redux/reducers/adminDrawerReducer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { removeSong } from "../../redux/reducers/playerReducer";
import { deleteToken } from "../../redux/reducers/tokenReducer";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminMenu() {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((status: RootState) => {
    return status.drawer.open;
  });
  const drawerWidth = 240;
  const navigate = useNavigate();

  const loginPages = [{ name: "Addresses", url: "address-management" }];

  const adminPages = [
    {
      name: "Artists",
      url: "admin/artists",
    },
    {
      name: "Albums",
      url: "admin/albums",
    },
    {
      name: "Songs",
      url: "admin/songs",
    },
  ];

  function logout() {
    dispatch(removeSong());
    dispatch(deleteToken());
    navigate("/");
    dispatch(hide());
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="right"
      open={drawerOpen}
    >
      <Toolbar />

      <Box>
        <IconButton
          size="large"
          aria-label="delete"
          sx={{ float: "left", marginLeft: "10px", marginBottom: "30px" }}
          onClick={() => {
            dispatch(hide());
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <List>
        {loginPages.map((page, index) => (
          <Link
            key={`admin-menu-${index}`}
            onClick={() => {
              dispatch(hide());
            }}
            to={page.url}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button key={"drawer-admin-" + index}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItem>
          </Link>
        ))}

        <Divider sx={{ marginY: "20px" }} />

        {adminPages.map((page, index) => (
          <Link
            key={`admin-menu-${index}`}
            onClick={() => {
              dispatch(hide());
            }}
            to={page.url}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button key={"drawer-admin-" + index}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItem>
          </Link>
        ))}

        <Divider sx={{ marginY: "20px" }} />

        <ListItem
          sx={{ color: "#bb0000" }}
          button
          onClick={() => {
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Drawer>
  );
}
