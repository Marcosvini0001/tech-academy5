import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="titulo-principal">
        <h1>
          <span className="gym">GYM</span>{" "}
          <span className="poison">POISON</span>
        </h1>
      </div>
      <div className="div-header">
        <a onClick={() => navigate("/")}>Home</a>
        <a onClick={() => navigate("/produtos")}>Products</a>
        <a onClick={() => navigate("/suporte")}>Support</a>
        <a onClick={() => navigate("/adm")}>ADM</a>

        <input
          type="search"
          className="search-input"
          name="name"
          placeholder="Search for your product"
        />
        <button className="btn-button">Search</button>

        {!isLoggedIn ? (
          <>
            <div className="div-login">
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
            <div className="div-registro">
              <button onClick={() => navigate("/registro")}>Register</button>
            </div>
          </>
        ) : (
          <div className="div-logout">
            <p>Welcome, {userName}!</p>
            <button onClick={() => navigate("/compras")}>Usuário</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
