const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File paths for data storage
const USERS_FILE = path.join(__dirname, "data/users.json");
const RECIPES_FILE = path.join(__dirname, "data/recipes.json");
const FAVORITES_FILE = path.join(__dirname, "data/favorites.json");

// Utility functions for reading and writing data
const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return []; // Return empty array if file read fails
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
  }
};

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Routes

// Root route for testing server
app.get("/", (req, res) => {
  res.send("Welcome to the Cookbook App API!");
});

// 1. User Authentication
app.post("/auth/register", (req, res) => {
  const users = readData(USERS_FILE);
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists!" });
  }

  users.push({ username, password });
  writeData(USERS_FILE, users);
  res.status(201).json({ message: "User registered successfully!" });
});

app.post("/auth/login", (req, res) => {
  const users = readData(USERS_FILE);
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  res.status(200).json({ message: "Login successful!", username });
});

// 2. Recipe Management
app.get("/recipes", (req, res) => {
  const recipes = readData(RECIPES_FILE);
  res.json(recipes);
});

app.post("/recipes", (req, res) => {
  const recipes = readData(RECIPES_FILE);
  const { name, ingredients, instructions, thumbnail, postedBy } = req.body;

  if (!name || !ingredients || !instructions || !postedBy) {
    return res.status(400).json({ message: "All recipe fields are required!" });
  }

  const newRecipe = {
    id: recipes.length + 1,
    name,
    ingredients,
    instructions,
    thumbnail: thumbnail || "",
    postedBy,
    postedAt: new Date().toISOString(),
  };

  recipes.push(newRecipe);
  writeData(RECIPES_FILE, recipes);

  res
    .status(201)
    .json({ message: "Recipe added successfully!", recipe: newRecipe });
});

app.delete("/recipes/:id", (req, res) => {
  let recipes = readData(RECIPES_FILE);
  const recipeId = parseInt(req.params.id, 10);

  if (isNaN(recipeId)) {
    return res.status(400).json({ message: "Invalid recipe ID!" });
  }

  const initialLength = recipes.length;
  recipes = recipes.filter((recipe) => recipe.id !== recipeId);

  if (recipes.length === initialLength) {
    return res.status(404).json({ message: "Recipe not found!" });
  }

  writeData(RECIPES_FILE, recipes);
  res.json({ message: "Recipe deleted successfully!" });
});

// 3. Favorite Recipes
app.get("/favorites/:username", (req, res) => {
  const favorites = readData(FAVORITES_FILE);
  const recipes = readData(RECIPES_FILE);

  const userFavoriteIds = favorites[req.params.username] || [];

  const userFavorites = recipes.filter((recipe) =>
    userFavoriteIds.includes(recipe.id)
  );
  res.json(userFavorites);
});

app.post("/favorites", (req, res) => {
  const favorites = readData(FAVORITES_FILE);
  const { username, recipeId } = req.body;

  if (!username || !recipeId) {
    return res
      .status(400)
      .json({ message: "Username and recipe ID are required!" });
  }

  if (!favorites[username]) {
    favorites[username] = [];
  }

  if (!favorites[username].includes(recipeId)) {
    favorites[username].push(recipeId);
    writeData(FAVORITES_FILE, favorites);
    return res.status(201).json({ message: "Recipe added to favorites!" });
  }

  res.status(400).json({ message: "Recipe is already in favorites!" });
});

app.delete("/favorites", (req, res) => {
  const favorites = readData(FAVORITES_FILE);
  const { username, recipeId } = req.body;

  if (!username || !recipeId) {
    return res
      .status(400)
      .json({ message: "Username and recipe ID are required!" });
  }

  if (!favorites[username]) {
    return res
      .status(404)
      .json({ message: "No favorites found for this user." });
  }

  favorites[username] = favorites[username].filter((id) => id !== recipeId);
  writeData(FAVORITES_FILE, favorites);
  res.json({ message: "Recipe removed from favorites!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
