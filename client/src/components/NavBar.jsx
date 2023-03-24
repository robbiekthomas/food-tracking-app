import * as React from "react";
import { useState } from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Link } from "react-router-dom";

import ThemeSettings from "./ThemeSettings";
import { useLoginContext } from "../contexts/login-status";
import { useModeContext } from "../contexts/mode-status";
import { useStateContext } from "../contexts/ContextProvider";
import styles from "../style";

const pages = ["dashboard", "tracker"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { loggedIn, setLoggedIn } = useLoginContext();
  const { mode, setMode } = useModeContext();
  const { themeSettings, setThemeSettings, currentColor } = useStateContext();

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

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("login", true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("login", false);

  };

  const handleModeChange = (event, newMode) => {
    setMode(newMode);
    localStorage.setItem("trackerMode", newMode);
  };



  return (
    <>
      {themeSettings && <ThemeSettings />}
      <AppBar position="static" style={{ background: currentColor }}>
        <Container maxWidth="xxl" className={`${styles.paddingX}`}>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to="/">NutritionShip</Link>

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
              {/* <Menu
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {<Link to={`/${page}`}>{page}</Link>}
                  </Typography>
                </MenuItem>
              ))}
            </Menu> */}
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {<Link to={`/tracker`}>Tracker</Link>}
              </Button>

              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {<Link to={`/dashboard`}>Dashboard</Link>}
              </Button>
            </Box>

            <ToggleButtonGroup
              color="secondary"
              value={mode}
              exclusive
              onChange={handleModeChange}
              aria-label="Platform"
            >
              <ToggleButton value="intuitive">Intuitive</ToggleButton>
              <ToggleButton value="standard">Standard</ToggleButton>
              <ToggleButton value="precise">Precise</ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ flexGrow: 0 }}>
              {!loggedIn && (
                <Link to="/tracker" onClick={handleLogin}>
                  Log In
                </Link>
              )}
              {loggedIn && (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-illustration-of-a-healthy-fat-man-situps-exercise-with-white-background-png-image_2194291.jpg"
                      />
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
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Button onClick={() => setThemeSettings(true)}>
                        <Typography textAlign="center">Settings</Typography>
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to="/"
                        onClick={() => {
                          handleLogout();
                          handleCloseUserMenu();
                        }}
                      >
                        <Typography textAlign="center">Logout</Typography>
                      </Link>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default NavBar;
