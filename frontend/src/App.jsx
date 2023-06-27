import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import CreateRecipe from "./pages/CreateRecipe";
import AuthContextProvider from "./context/AuthContext";
import Bookmarks from "./pages/Bookmarks";
import UserPage from "./pages/UserPage";
import EditRecipe from "./pages/EditRecipe";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/user-info" element={<UserPage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
