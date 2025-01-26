import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const RecipeCard = ({ recipe, isFavorite, onFavoriteToggle }) => {
  return (
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
        e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0, 0, 0, 0.2)";
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
        onClick={onFavoriteToggle}
        style={{
          color: isFavorite ? "#ff4081" : "#ffffff",
          alignSelf: "center",
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default RecipeCard;
