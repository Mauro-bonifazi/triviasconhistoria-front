import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo-trivias.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { isUserLogged, logout } = useAuth();

  const isLoggedIn = isUserLogged;

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogin = () => {
    handleCloseMenu();
    navigate("/login");
  };

  const handlePanel = () => {
    handleCloseMenu();
    navigate("/panel");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseMenu();
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2F2F2F", // color actual que querés mantener
        }}
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  height: 50,
                  width: 50,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${theme.palette.accent.main}`, // borde dorado del theme
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Cinzel', serif", // Si tenés definido en theme, podés usar theme.typography.logo
                  fontWeight: "bold",
                  color: theme.palette.accent.main, // título dorado del theme
                }}
              >
                Trivias con Historia
              </Typography>
            </Link>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              component={Link}
              to="/search"
              sx={{
                color: theme.palette.background.default,
                "&:hover": { color: theme.palette.accent.main },
              }}
            >
              <SearchIcon />
            </IconButton>

            <IconButton
              component={Link}
              to="/contact"
              sx={{
                color: theme.palette.background.default,
                "&:hover": { color: theme.palette.accent.main },
              }}
            >
              <MailOutlineIcon />
            </IconButton>

            <Tooltip title="Cuenta">
              <IconButton
                onClick={handleOpenMenu}
                sx={{ color: theme.palette.background.default }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {!isLoggedIn ? (
                <MenuItem onClick={handleLogin}>Acceso Administrador</MenuItem>
              ) : (
                <>
                  <MenuItem onClick={handlePanel}>Panel</MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/search">
                <ListItemText primary="Buscar Trivias" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/contact">
                <ListItemText primary="Contacto" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {!isLoggedIn ? (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogin}>
                  <ListItemText primary="Acceso Administrador" />
                </ListItemButton>
              </ListItem>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={handlePanel}>
                    <ListItemText primary="Panel" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Cerrar sesión" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
