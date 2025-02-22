import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="">
      Aula 2 - Componentes
      <Card
        texto="Meu card com props"
        header="Card 1"
        footer="Footer card 1"
      ></Card>
      <Card texto="Meu segundo card com prosp" header="Header Card 2"></Card>
    </div>
  );
}

export default App;
