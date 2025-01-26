import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecipeCreator = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle recipe name change with suggestions
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (value.length > 2) {
      setLoadingSuggestions(true);
      axios
        .get(`https://forkify-api.herokuapp.com/api/search?q=${value}`)
        .then((response) => {
          const suggestedRecipes = response.data.recipes.map(
            (recipe) => recipe.title
          );
          setSuggestions(suggestedRecipes);
          setLoadingSuggestions(false);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setLoadingSuggestions(false);
        });
    } else {
      setSuggestions([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const recipeData = {
      name,
      ingredients: ingredients.split(","),
      instructions,
      thumbnail,
      postedBy:
        JSON.parse(localStorage.getItem("user"))?.username || "Anonymous",
    };

    axios
      .post("http://localhost:5000/recipes", recipeData)
      .then(() => {
        alert("Recipe created successfully!");
        setName("");
        setIngredients("");
        setInstructions("");
        setThumbnail("");
        setSuggestions([]);
        setIsSubmitting(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);
        alert("Error creating recipe.");
        setIsSubmitting(false);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ backgroundColor: "#121212", padding: "20px" }}
    >
      <Container
        style={{
          padding: "20px",
          maxWidth: "600px",
          backgroundColor: "#1e1e1e",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ffffff" }}>
          Create a Recipe
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            label="Recipe Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            required
            InputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
          />
          {loadingSuggestions ? (
            <CircularProgress
              style={{ color: "#ffffff", margin: "10px auto" }}
            />
          ) : (
            suggestions.length > 0 && (
              <List style={{ backgroundColor: "#2e2e2e", borderRadius: "4px" }}>
                {suggestions.map((suggestion, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => setName(suggestion)}
                    style={{ color: "#ffffff" }}
                  >
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            )
          )}
          <TextField
            label="Ingredients (comma separated)"
            variant="outlined"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            InputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
          />
          <ReactQuill
            value={instructions}
            onChange={setInstructions}
            placeholder="Enter recipe instructions..."
            style={{ backgroundColor: "#ffffff" }}
          />
          <TextField
            label="Thumbnail URL"
            variant="outlined"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            InputProps={{ style: { color: "#ffffff" } }}
            InputLabelProps={{ style: { color: "#ffffff" } }}
          />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Recipe"}
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default RecipeCreator;
