import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", { username, password })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        onLogin();
      })
      .catch(() => {
        setError("Invalid username or password.");
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ backgroundColor: "#121212" }}
    >
      <Container
        style={{
          padding: "20px",
          maxWidth: "400px",
          backgroundColor: "#1e1e1e",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ffffff" }}>
          Login
        </Typography>
        {error && (
          <Typography variant="body2" style={{ color: "red" }}>
            {error}
          </Typography>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            InputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
          />
          {/* <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          > */}
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Typography
            variant="body1"
            style={{ color: "white", textAlign: "center" }}
          >
            Don&apos;t have an account?
            <Link
              to="/register"
              style={{
                color: "#4caf50",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Register here
            </Link>
          </Typography>
          {/* </div> */}
        </form>
      </Container>
    </Box>
  );
};

export default Login;
