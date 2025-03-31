import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name); // Extract the user's name
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from local storage
    localStorage.removeItem("token"); // Remove token from local storage
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
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
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="div-header">
        <a href="">Products</a>
        <a href="">Home</a>
        <a href="">Support</a>
        <a href="" onClick={() => navigate("/cadastrop")}>
          Register Products
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