import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match. Please try again.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      const userData = {
        id: 0,
        username,
        password,
        email,
      };

      try {
        const response = await fetch("/cadastro/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          alert("Cadastro realizado!");
          navigate("/");
        } else {
          throw new Error("Signup failed.");
        }
      } catch (error) {
        console.error(error);
        alert(
          "Não foi possível realizar o cadastro. Tente novamente mais tarde."
        );
      }
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Selecione uma imagem.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Cadastrar-se</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Senha:
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
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar senha:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Nome de usuário:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                      Foto do perfil:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      onChange={handleFileChange}
                      accept="image/*"
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
                      Cadastrar-se
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

export default SignupPage;
