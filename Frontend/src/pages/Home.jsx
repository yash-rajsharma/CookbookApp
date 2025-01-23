import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div
      className="home"
      style={{
        padding: "20px",
        backgroundColor: "#121212",
        color: "#ffffff",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ color: "#ffffff" }}>
        Welcome to the Cookbook App
      </Typography>
      <TextField
        label="Search recipes..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "4px",
        }}
      />
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card
              sx={{
                backgroundColor: "#1e1e1e",
                color: "#ffffff",
                transition: "all 0.3s ease-in-out",
                ":hover": { transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={recipe.thumbnail || "https://via.placeholder.com/150"}
                alt={recipe.name}
              />
              <CardContent>
                <Typography variant="h6" style={{ color: "#ffffff" }}>
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Posted By: {recipe.postedBy}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ingredients: {recipe.ingredients.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default Home;
