import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeCreator from "./pages/RecipeCreator";
import Favorites from "./pages/Favorites";

const RouteHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for session
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Register onRegister={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/create-recipe"
          element={
            isAuthenticated ? <RecipeCreator /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/favorites"
          element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </div>
  );
};
export default RouteHandler;
