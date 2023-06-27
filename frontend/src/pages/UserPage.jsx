import React, { useState, useEffect } from "react";
import NavbarUser from "../components/NavbarUser";
import { AiFillEdit } from "react-icons/ai";

function UserPage() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchUserRecipes();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/usuario", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const fetchUserRecipes = async () => {
    try {
      const response = await fetch("/receitas/salvas/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user recipes");
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  return (
    <>
      <NavbarUser />
      <div className="container my-5">
        {user && (
          <div className="row justify-content-center">
            <div className="col-md-2 text-center">
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: "200px",
                  height: "200px",
                  background: `url(${user.picture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="mt-3">
              <h2 className="text-center">{user.name}</h2>
              <p className="text-center">{user.email}</p>
            </div>
          </div>
        )}
        <div className="row mt-5">
          {recipes.length > 0 && (
            <div className="col-md-12">
              <h3>Suas receitas</h3>
              <ul className="list-group mt-4">
                {recipes.map((recipe) => (
                  <li className="list-group-item" key={recipe.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{recipe.titulo}</h5>
                        <p className="recipe-description">{recipe.descricao}</p>
                      </div>
                      <div>
                        <a href={`/edit-recipe/${recipe.id}`}>
                          <AiFillEdit
                            size={20}
                            color="gray"
                            onMouseEnter={(e) =>
                              (e.target.style.fill = "black")
                            }
                            onMouseLeave={(e) => (e.target.style.fill = "")}
                          />
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserPage;
