import Header from "./componentes/Header";
import "./styles/Styles.css";
import Card from "./componentes/Card";
import Nav from "./componentes/Nav";
import "./styles/Card.css";
import "./styles/Nav.css";
import Footer from "./componentes/Footer";
import "./styles/Footer.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Nav></Nav>
      <Card></Card>
      <Footer></Footer>
    </div>
  );
}

export default App;
