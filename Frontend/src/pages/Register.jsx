import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/register", { username, password })
      .then((response) => {
        navigate("/login");
      })
      .catch(() => {
        setError("User already exists.");
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
          Register
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
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
