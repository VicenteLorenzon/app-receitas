import React, { useContext } from "react";
import { BsPlus, BsBookmark, BsPerson } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "react-bootstrap";

function NavbarUser() {
  const navbarStyle = {
    backgroundColor: "orange",
  };

  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        logout();
        navigate("/");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Logout failed. Please try again later.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
      <div className="container">
        <a className="navbar-brand" href="/">
          Receitas
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/create-recipe">
                <BsPlus size={30} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/bookmarks">
                <BsBookmark size={20} />
              </a>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="nav-link"
                >
                  <BsPerson size={25} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/user-info">Seus dados</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarUser;
