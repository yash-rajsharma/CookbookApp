import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      style={{
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        padding: "10px 20px",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        &copy; 2025 Cookbook App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
