import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token); // Save token in local storage
      localStorage.setItem("user", JSON.stringify(user)); // Save user data in local storage
      alert(`Login successful! Welcome, ${user.name}`);
      navigate("/"); // Redirect to the principal page
    } catch (error: unknown) {
      console.error("Error during login:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Error during login.");
      } else {
        setError("Unknown error during login.");
      }
    }
  };

  return (
    <div className="login">
      <div className="h2-login">
        <h2>LOGIN</h2>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/registro">Create Account</Link>
    </div>
  );
};

export default Login;