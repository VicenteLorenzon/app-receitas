import React, { useState, useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AuthenticatedPage from "../hocs/AuthenticatedPage";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("/receitas/");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/receitas/?search=${searchTerm}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmarkToggle = async (recipeId) => {
    try {
      const response = await fetch(`/receitas/salvar/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBookmarked: !recipe.isBookmarked }),
      });

      if (!response.ok) {
        throw new Error("Bookmark request failed");
      }

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) => {
          if (recipe.id === recipeId) {
            return {
              ...recipe,
              isBookmarked: !recipe.isBookmarked,
            };
          }
          return recipe;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key={fullStars} />);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<BsStar key={fullStars + (hasHalfStar ? 1 : 0) + i} />);
    }

    return stars;
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="me-auto">Receitas</h1>
          <form
            onSubmit={handleSearch}
            className="input-group"
            style={{ width: "300px" }}
          >
            <input
              id="search-input"
              type="search"
              className="form-control"
              placeholder="Pesquisar"
              style={{ width: "200px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              id="search-button"
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "orange", borderColor: "orange" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "darkorange")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "orange")}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {recipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <Link
                to={`/recipes/${recipe.id}`}
                className="card h-100 d-flex flex-column position-relative text-decoration-none"
              >
                <div className="upper-left-icon"></div>
                <img
                  src={recipe.imagem}
                  className="card-img-top"
                  alt={recipe.titulo}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.titulo}</h5>
                  <div className="d-flex align-items-center">
                    <div className="me-auto">
                      {renderStarRating(recipe.rating)}
                    </div>
                    <div className="position-absolute top-0 end-0 mt-2 me-2">
                      <button
                        className="btn btn-light btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookmarkToggle(recipe.id);
                        }}
                      >
                        {recipe.isBookmarked ? (
                          <HiBookmark size={20} className="text-gray" />
                        ) : (
                          <HiOutlineBookmark size={20} className="text-gray" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthenticatedPage(Recipes);
