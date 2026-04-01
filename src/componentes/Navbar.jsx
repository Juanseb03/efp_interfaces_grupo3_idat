import logoBlanco from "../imagenes/LogoBlanco.png";
import Button from "./Button";
import '../estilos/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoBlanco} alt="Logo" />
      </div>
      <div className="menu">
        <a href='#registro-visitas'>
          <Button estilo="boton-menu" texto="Registrar"/>
        </a>
        <a href='#tabla-visitas'>
          <Button estilo="boton-menu" texto="Ver registro"/>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;