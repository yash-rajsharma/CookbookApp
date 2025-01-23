import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#121212", transition: "all 0.3s ease-in-out" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#ffffff" }}
        >
          Cookbook App
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button sx={{ color: "#ffffff" }} component={Link} to="/">
            Home
          </Button>
          {isAuthenticated && (
            <Button
              sx={{ color: "#ffffff" }}
              component={Link}
              to="/create-recipe"
            >
              Create Recipe
            </Button>
          )}
          {isAuthenticated && (
            <Button sx={{ color: "#ffffff" }} component={Link} to="/favorites">
              Favorites
            </Button>
          )}
          {!isAuthenticated && (
            <Button sx={{ color: "#ffffff" }} component={Link} to="/login">
              Login
            </Button>
          )}
          {!isAuthenticated && (
            <Button sx={{ color: "#ffffff" }} component={Link} to="/register">
              Register
            </Button>
          )}
          {isAuthenticated && (
            <Button sx={{ color: "#ffffff" }} onClick={onLogout}>
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
