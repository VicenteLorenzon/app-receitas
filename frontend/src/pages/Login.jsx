import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const response = await fetch("/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        login();
        navigate("/");
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Entrar</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "150px",
                        backgroundColor: "orange",
                        borderColor: "orange",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "darkorange")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "orange")
                      }
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
