import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./styles/Styles.css";
import Card from "./componentes/Card";
import "./styles/Card.css";
import "font-awesome/css/font-awesome.min.css";
import Home from "./pages/Home";
import Footer from "./componentes/Footer";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import "../src/styles/Login.css";
import "../src/styles/Registro.css";
import "../src/styles/CadastroProdutos.css";
import FormaPagamento from "../src/pages/FormaPagamento";
import "../src/styles/FormaPagamento.css";
import PaginaADM from "../src/pages/PageAdm";
import "../src/styles/ListaUsuario.css";
import "../src/styles/PageADM.css";
import Compras from "./pages/Compras";


function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/adm/*" element={<PaginaADM />} />
        <Route path="/formapagamento" element={<FormaPagamento />} />
        <Route path="/compras" element={<Compras />} />
      </Routes>

      {location.pathname === "/" && <Card />}

      <Footer />
    </div>
  );
}

export default App;