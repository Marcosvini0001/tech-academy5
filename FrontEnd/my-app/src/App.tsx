import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import "../src/styles/Compras.css";
import "../src/styles/Home.css";
import ControleProdutos from "./pages/ControleProdutos";
import "../src/styles/ControleProdutos.css";
import Suporte from "../src/pages/Suporte"; 
import "../src/styles/Suporte.css";
import Carrinho from "./pages/Carrinho";
import "../src/styles/Carrinho.css";
import FinalizarCompra from "./pages/FinalizarCompra";
import MeusSuportes from "./pages/MeusSuportes";
import '../src/styles/Footer.css'
import AdminRoute from "./componentes/AdminRoute";


function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/adm/*"
          element={
            <AdminRoute>
              <PaginaADM />
            </AdminRoute>
          }
        />
        <Route path="/produtos" element={<Card />} />
        <Route path="/formapagamento" element={<FormaPagamento />} />
        <Route path="/formapagamento/:id" element={<FormaPagamento />} />  
        <Route path="/compras" element={<Compras />} />
        <Route path="/controleprodutos" element={<ControleProdutos />} />
        <Route path="/suporte" element={<Suporte />} /> 
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/finalizar-compra" element={<FinalizarCompra />} />
        <Route path="/meus-suportes" element={<MeusSuportes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
