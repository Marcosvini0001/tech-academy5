const Footer = () => {
  return (
    <div>
      <footer>
        <div className="redes-sociais">
          <h5>Redes Sociais</h5>
          <a href="">Instagram</a>
          <a href="">Facebook</a>
          <a href="">Youtube</a>
        </div>
        <div className="contato">
          <h5>Contato</h5>
          <a href="">Solucão de Problemas</a>
          <a href="">Comprar</a>
          <a href="">Vender</a>
        </div>
        <div className="desenvolvedores">
          <h5>Desenvolvedores</h5>
          <div>
            <span>Lucas Koji Takahashi Maeda</span>
            <a
              href="https://www.linkedin.com/in/lucas-koji" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "8px", color: "#0e76a8" }}
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
          <div>
            <span>Marcos Vinicius Bartoli Senko</span>
            <a
              href="https://www.linkedin.com/in/marcos-vinicius-bartoli-senko" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "8px", color: "#0e76a8" }}
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
