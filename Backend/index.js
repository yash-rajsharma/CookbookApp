// Backend for the Cookbook App

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

// Data files   
const USERS_FILE = "./users.json";
const RECIPES_FILE = "./recipes.json";
const FAVORITES_FILE = "./favorites.json";

// Utility functions
const readData = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const writeData = (filePath, data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// 1. User Authentication
app.post("/auth/register", (req, res) => {
  const users = readData(USERS_FILE);
  const { username, password } = req.body;

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists!" });
  }

  users.push({ username, password });
  writeData(USERS_FILE, users);
  res.status(201).json({ message: "User registered successfully!" });
});

app.post("/auth/login", (req, res) => {
  const users = readData(USERS_FILE);
  const { username, password } = req.body;

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
  const newRecipe = req.body;

  newRecipe.id = recipes.length + 1;
  newRecipe.postedAt = new Date().toISOString();
  recipes.push(newRecipe);

  writeData(RECIPES_FILE, recipes);
  res
    .status(201)
    .json({ message: "Recipe added successfully!", recipe: newRecipe });
});

app.delete("/recipes/:id", (req, res) => {
  let recipes = readData(RECIPES_FILE);
  const recipeId = parseInt(req.params.id, 10);

  recipes = recipes.filter((recipe) => recipe.id !== recipeId);
  writeData(RECIPES_FILE, recipes);
  res.json({ message: "Recipe deleted successfully!" });
});

// 3. Favorite Recipes
app.get("/favorites/:username", (req, res) => {
  const favorites = readData(FAVORITES_FILE);
  const userFavorites = favorites[req.params.username] || [];
  res.json(userFavorites);
});

app.post("/favorites", (req, res) => {
  const favorites = readData(FAVORITES_FILE);
  const { username, recipeId } = req.body;

  if (!favorites[username]) {
    favorites[username] = [];
  }

  favorites[username].push(recipeId);
  writeData(FAVORITES_FILE, favorites);
  res.status(201).json({ message: "Recipe added to favorites!" });
});

app.delete("/favorites", (req, res) => {
  const favorites = readData(FAVORITES_FILE);
  const { username, recipeId } = req.body;

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
