function Card() {
  return (
    <div className="lista-cards">
      <div className="produto">
        <img src="src/img/user.png"></img>
        <h2>NOME PRODUTO</h2>
        <p>Descrição</p>
        <div className="button-card">
          <button className="button-carrinho">Adicionar ao carrinho</button>
          <button className="button-comprar">Comprar</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
