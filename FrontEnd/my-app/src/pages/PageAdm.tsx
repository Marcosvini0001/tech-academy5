import { Link, Routes, Route } from "react-router-dom";
import CadastroProdutos from "../pages/CadastroProdutos";
import ListaDeUsuarios from "../pages/ListaDeUsuarios";

const PaginaADM = () => {
  return (
    <div>
      <h2>Área Administrativa</h2>
      <nav>
        <Link to="/adm/cadastro">Cadastro</Link>
        <Link to="/adm/listadeusuario">Lista de Usuários</Link>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="cadastro" element={<CadastroProdutos />} />
        <Route path="listadeusuario" element={<ListaDeUsuarios />} />
      </Routes>
    </div>
  );
};

export default PaginaADM;
