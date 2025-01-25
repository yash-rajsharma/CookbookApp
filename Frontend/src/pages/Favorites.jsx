import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`http://localhost:5000/favorites/${user.username}`)
        .then((response) => {
          setFavorites(response.data);
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
              <Card
                style={{
                  height: "100%",
                  backgroundColor: "#1e1e1e",
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0px 4px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={recipe.thumbnail || "https://via.placeholder.com/160"}
                  alt={recipe.name}
                  style={{ objectFit: "cover", borderRadius: "4px 4px 0 0" }}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                  >
                    {recipe.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#bbbbbb", margin: "10px 0" }}
                  >
                    Ingredients: {recipe.ingredients?.join(", ")}
                  </Typography>
                  <Typography variant="body2" style={{ color: "#bbbbbb" }}>
                    Posted By: {recipe.postedBy}
                  </Typography>
                </CardContent>
                <IconButton
                  onClick={() => handleRemoveFavorite(recipe.id)}
                  style={{ color: "#ff4081", alignSelf: "center" }}
                >
                  <FavoriteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
