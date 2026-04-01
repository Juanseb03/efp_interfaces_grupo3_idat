import { Link } from "react-router-dom";
import logoPagina from "../imagenes/LogoBlanco.png";
import "../estilos/Tarjeta.css";

const Tarjeta = ({ logo = false, amplia = false, id, titulo, texto, linkTexto, linkRuta, children }) => {
  return (
    <div id={id} className={`tarjeta-container ${amplia ? 'amplia' : ''}`}>
      {logo && (
        <div className="tarjeta-logo">
          <img src={logoPagina} alt="Logo"/>
        </div>
      )}

      <div className="tarjeta-formulario">
        <h2>{titulo}</h2>
        <hr/>
        <p>{texto}<Link to={linkRuta}>{linkTexto}</Link></p>
        {children}
      </div>
    </div>
  );
}

export default Tarjeta;