// components/Navbar.jsx
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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo-trivias.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
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
        sx={{ backgroundColor: "#2F2F2F" }}
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Botón hamburguesa solo visible en móviles */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo + Título */}
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
                  border: "2px solid #BFA45F",
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: "bold",
                  color: "#BFA45F",
                }}
              >
                Trivias con Historia
              </Typography>
            </Link>
          </Box>

          {/* Iconos de acción en desktop */}
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
              sx={{ color: "white", "&:hover": { color: "#ccc" } }}
            >
              <SearchIcon />
            </IconButton>

            <IconButton
              component={Link}
              to="/contact"
              sx={{ color: "white", "&:hover": { color: "#ccc" } }}
            >
              <MailOutlineIcon />
            </IconButton>

            <Tooltip title="Cuenta">
              <IconButton onClick={handleOpenMenu} sx={{ color: "white" }}>
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

      {/* Drawer lateral para móviles */}
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
