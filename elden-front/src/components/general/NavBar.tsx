import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoImg from "../../img/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileImg from "../../img/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken } from "../../redux/reducers/tokenReducer";
import { RootState } from "../../redux/store";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import { show } from "../../redux/reducers/adminDrawerReducer";
import { publicPages } from "../../util/pagesRoutes";
import { removeSong } from "../../redux/reducers/playerReducer";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.token);

  const settings = [
    {
      name: "Logout",
      action: logout,
    },
  ];

  function logout() {
    handleCloseUserMenu();
    dispatch(deleteToken());
    dispatch(removeSong());
    navigate("/");
  }

  function shouldBeHidden(actualLocation) {
    for (let index = 0; index < routesToHide.length; index++) {
      const route = routesToHide[index];
      if (actualLocation.match(route)) {
        return true;
      }
    }
    return false;
  }

  if (shouldBeHidden(location.pathname)) {
    return null;
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    dispatch(show());
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (shouldBeHidden(location.pathname)) {
    return null;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg" sx={{ paddingY: "10px" }}>
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none" }} to="/">
              <div className="logo-comp--nv">
                <img src={LogoImg} alt="" className="logo-comp__img--nv" />
                <p>Elden Music</p>
              </div>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {publicPages.map((page) => (
                <MenuItem
                  key={"navbar-item" + page.name}
                  onClick={handleCloseNavMenu}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Link style={{ textDecoration: "none" }} to={page.url}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </Link>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Link style={{ textDecoration: "none" }} to="/">
              <div className="logo-comp--nv">
                <img src={LogoImg} alt="" className="logo-comp__img--nv" />
                <p>Elden Music</p>
              </div>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {publicPages.map((page, key) => (
              <Link
                style={{ textDecoration: "none" }}
                to={page.url}
                key={"navbar-item-2" + key}
              >
                <Button
                  key={"navbar-item-2" + page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {token ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <IconButton
                  size="large"
                  aria-label="delete"
                  onClick={() => {
                    dispatch(show());
                  }}
                >
                  <LibraryMusicRoundedIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 0, display: "flex" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={profileImg} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "right",
              }}
            >
              <Link style={{ textDecoration: "none" }} to={"/login"}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Log In
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const routesToHide = ["/login", "/signin"];

export default ResponsiveAppBar;
