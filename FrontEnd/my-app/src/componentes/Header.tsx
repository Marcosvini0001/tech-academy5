import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userStr && token) {
      const user = JSON.parse(userStr);
      setIsLoggedIn(true);
      setUserName(user.name);
      setIsAdmin(user.role === "admin");
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const handleSearch = () => { // nova funcção para pesquisa
    if (searchTerm.trim() !== "") {
      navigate(`/produtos?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/produtos");
    }
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
        <a onClick={() => navigate("/meus-suportes")}>Meus support</a>
        {isAdmin && (
          <a onClick={() => navigate("/adm")}>ADM</a>
        )}

        <input
          type="search"
          className="search-input"
          name="name"
          placeholder="Search for your product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
        />
        <button className="btn-button" onClick={handleSearch}>Search</button>
        <button onClick={() => navigate("/carrinho")}>🛒 Carrinho</button>

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
