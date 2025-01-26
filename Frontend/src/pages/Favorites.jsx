import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RecipeCard from "../components/RecipeCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`http://localhost:5000/favorites/${user.username}`)
        .then((response) => {
          setFavorites(response.data);
          console.log(response.data); // Debugging API response
        })
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, []);

  const handleRemoveFavorite = (recipeId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .delete("http://localhost:5000/favorites", {
        data: { username: user.username, recipeId },
      })
      .then(() =>
        setFavorites((prev) => prev.filter((recipe) => recipe.id !== recipeId))
      )
      .catch((error) => console.error("Error removing favorite:", error));
  };

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
        Your Favorite Recipes
      </Typography>
      {favorites.length === 0 ? (
        <Typography
          variant="h6"
          style={{ color: "#bbbbbb", textAlign: "center", marginTop: "20px" }}
        >
          You have no favorite recipes yet.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {favorites.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
              <RecipeCard
                recipe={recipe} // Pass the recipe details
                isFavorite={true} // Since it's the favorites page
                onFavoriteToggle={() => handleRemoveFavorite(recipe.id)} // Remove logic
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
