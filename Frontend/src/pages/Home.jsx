import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`http://localhost:5000/favorites/${user.username}`)
        .then((response) =>
          setFavorites(response.data.map((fav) => fav.recipeId))
        )
        .catch((error) => console.error(error));
    }
  }, []);

  const handleFavoriteToggle = (recipeId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const isFavorite = favorites.includes(recipeId);

    if (isFavorite) {
      axios
        .delete("http://localhost:5000/favorites", {
          data: { username: user.username, recipeId },
        })
        .then(() =>
          setFavorites((prev) => prev.filter((id) => id !== recipeId))
        )
        .catch((error) => console.error("Error removing favorite:", error));
    } else {
      axios
        .post("http://localhost:5000/favorites", {
          username: user.username,
          recipeId,
        })
        .then(() => setFavorites((prev) => [...prev, recipeId]))
        .catch((error) => console.error("Error adding favorite:", error));
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      style={{
        padding: "20px",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "#ffffff", textAlign: "center" }}
      >
        Welcome to Recipe Book
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search recipes by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "4px",
        }}
      />
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 2 }}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              isFavorite={favorites.includes(recipe.id)}
              onFavoriteToggle={() => handleFavoriteToggle(recipe.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
