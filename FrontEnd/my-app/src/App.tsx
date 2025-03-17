import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/Styles.css";
import Card from "./componentes/Card";
import "./styles/Card.css";
import "font-awesome/css/font-awesome.min.css";
import Home from "./pages/Home";
import Footer from "./componentes/Footer";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Card />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
