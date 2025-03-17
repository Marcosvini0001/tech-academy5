import "./styles/Styles.css";
import Card from "./componentes/Card";
import "./styles/Card.css";
import "font-awesome/css/font-awesome.min.css";
import Home from "../src/pages/Home";
import Footer from "../src/componentes/Footer";

function App() {
  return (
    <div className="app">
      <Home></Home>
      <Card></Card>
      <Footer></Footer>
    </div>
  );
}

export default App;
