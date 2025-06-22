import { Link, Routes, Route } from "react-router-dom";
import CadastroProdutos from "../pages/CadastroProdutos";
import ListaDeUsuarios from "../pages/ListaDeUsuarios";
import ControleProdutos from "./ControleProdutos";
import SuporteADM from "./SuporteADM";


const PaginaADM = () => {
  return (
    <div className="pageadm">
      <div className="h2-pageadm">
        <h2>Área Administrativa</h2>
      </div>
      <nav className="nav-pageadm">
        <Link className="link-pageadm" to="/">Voltar</Link>
        <Link className="link-pageadm" to="/adm/cadastro">Cadastro de Produtos</Link>
        <Link className="link-pageadm" to="/adm/controleprodutos">Controle de Produtos</Link>
        <Link className="link-pageadm" to="/adm/listadeusuario">Lista de Usuários</Link>
        <Link className="link-pageadm" to="/adm/suporteadm">Suporte ADM</Link>
      </nav>

      <Routes>
        <Route path="cadastro" element={<CadastroProdutos />} />
        <Route path="controleprodutos" element={<ControleProdutos />} />
        <Route path="listadeusuario" element={<ListaDeUsuarios />} />
        <Route path="suporteadm" element={<SuporteADM />} />
      </Routes>
    </div>
  );
};

export default PaginaADM;