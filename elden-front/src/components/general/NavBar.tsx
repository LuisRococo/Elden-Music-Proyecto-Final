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
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import profileImg from "../../img/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken } from "../../redux/reducers/tokenReducer";
import { RootState } from "../../redux/store";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import { show } from "../../redux/reducers/adminDrawerReducer";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.token);

  const pages = [
    {
      name: "HOME",
      url: "/",
    },
  ];

  const pagesUser = [
    {
      name: "My Songs",
      url: "/",
    },
  ];

  const settings = [
    {
      name: "Logout",
      action: logout,
    },
  ];

  function logout() {
    handleCloseUserMenu();
    dispatch(deleteToken());
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
          <Link href="/" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <div className="logo-comp--nv">
              <img src={LogoImg} alt="" className="logo-comp__img--nv" />
              <p>Elden Music</p>
            </div>
          </Link>

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
              {pages.map((page) => (
                <MenuItem
                  key={"navbar-item" + page.name}
                  onClick={handleCloseNavMenu}
                >
                  <Link href={page.url} sx={{ textAlign: "center" }}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link
            href="/"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <div className="logo-comp--nv">
              <img src={LogoImg} alt="" className="logo-comp__img--nv" />
              <p>Elden Music</p>
            </div>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, key) => (
              <Link href={page.url} key={"navbar-item-2" + key}>
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
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={"navbar-settings" + setting.name}
                      onClick={() => {
                        setting.action();
                      }}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
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
              <Link href={"/login"}>
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
