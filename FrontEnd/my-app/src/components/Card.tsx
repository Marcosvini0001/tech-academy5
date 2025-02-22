import "./Card.css";

type CardProps = {
  texto: string;
  header?: string;
  footer?: string;
};

const Card = ({ texto, header, footer }: CardProps) => {
  return (
    <div className="container">
      <div className="header">{header}</div>
      <div className="body">{texto}</div>
      {footer ? <div className="footer">{footer}</div> : <></>}
    </div>
  );
};

export default Card;

//slr
