import React, { useState } from "react";
import NavbarUser from "../components/NavbarUser";

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

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
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      titulo: title,
      descricao: description,
      ingredientes: ingredients,
      instrucoes: instructions,
      imagem: image,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/receitas/criar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error("Recipe creation failed");
      }

      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImage(null);
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <>
      <NavbarUser />
      <div className="container mt-4">
        <h1>Criar receita</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-4">
            <label htmlFor="title" className="form-label">
              Title
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
            <label className="form-label">Ingredientes</label>
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
              Criar receita
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateRecipe;
