import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <header>
        <div className="titulo-principal">
          <h1>GYM POISON</h1>
        </div>
        <div className="div-usuario">
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
              <button onClick={() => navigate("/compras")}>Usuário</button> {}
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="div-header">
        <a href="">Products</a>
        <a href="">Home</a>
        <a href="">Support</a>
        <a href="" onClick={() => navigate("/adm")}>
          ADM
        </a>
      </div>

      <div>
        <div className="div-nav">
          <input
            type="search"
            id="search"
            name="name"
            placeholder="Search for your product"
          />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
