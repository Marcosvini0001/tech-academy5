import Header from './componentes/Header'
import './styles/Styles.css';
import Card from'./componentes/Card'
import Nav from './componentes/Nav'
import './styles/Card.css'
import './styles/Nav.css'

function App() {

  return (
    <div className="app">
      <Header></Header>
      <Nav></Nav>
      <Card></Card>

    </div>
  );
}

export default App;
