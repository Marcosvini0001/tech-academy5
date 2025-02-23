import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="">
      <header>
        <p>The Barber Man</p>
        <div className="div-button">
          <button className="button-login">Login</button>
          <button className="button-registro">Registre-se</button>
        </div>
      </header>
      <div className="cards">
        <Card
          texto="Meu card com props"
          header="Barbeiro 1"
          footer="Footer card 1"
        ></Card>
        <Card texto="Meu segundo card com prosp" header="Barbeiro 2"></Card>
      </div>
    </div>
  );
}

export default App;
