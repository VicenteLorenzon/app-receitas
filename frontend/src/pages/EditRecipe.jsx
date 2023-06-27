import React, { useState, useEffect } from "react";
import NavbarUser from "../components/NavbarUser";
import { useParams } from "react-router-dom";

function EditRecipe() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`/receitas/${id}`);
      const recipeData = await response.json();

      setTitle(recipeData.title);
      setDescription(recipeData.description);
      setIngredients(recipeData.ingredients.join(", "));
      setInstructions(recipeData.instructions);
      setImage(recipeData.image);
    } catch (error) {
      console.log("Error fetching recipe details:", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      id,
      title,
      description,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions,
      image,
    };

    try {
      const response = await fetch(`/receitas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setIngredients("");
        setInstructions("");
        setImage("");
        console.log("Recipe updated successfully!");
      } else {
        console.log("Failed to update recipe.");
      }
    } catch (error) {
      console.log("Error updating recipe:", error);
    }
  };

  return (
    <>
      <NavbarUser />
      <div className="container mt-4">
        <h1>Editar receita</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-4">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descrição
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Ingredients</label>
            <input
              type="text"
              className="form-control"
              value={ingredients}
              onChange={handleIngredientsChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">
              Instruções
            </label>
            <textarea
              className="form-control"
              id="instructions"
              value={instructions}
              onChange={handleInstructionsChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Imagem
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "orange", borderColor: "orange" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "darkorange")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "orange")}
            >
              Editar receita
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditRecipe;
