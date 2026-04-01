import { Link } from 'react-router-dom';
import '../estilos/TarjetaEmergente.css'
import '../estilos/Tarjeta.css'

const TarjetaEmergente = ({ abierto, cerrar, titulo, texto, linkRuta, linkTexto, children }) => {
  if (!abierto) return null;

  return (
    <div className="tarjeta-emergente" onClick={cerrar}>
      <div className="tarjeta-container">
        <div className="tarjeta-formulario" onClick={e => e.stopPropagation()}>
          <h2>{titulo}</h2>
          <hr/>
          <p>{texto}<Link to={linkRuta}>{linkTexto}</Link></p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default TarjetaEmergente