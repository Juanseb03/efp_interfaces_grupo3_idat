import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tarjeta from "../componentes/Tarjeta";
import Input from "../componentes/Input";
import Button from "../componentes/Button";
import "../estilos/Auth.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const navigate = useNavigate()

  const iniciarSesion = (e) => {
    e.preventDefault();

    /* TRAE A LOS USUARIOS GUARDADOS EN LA MEMORIA DEL NAVEGADOR */
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    /* FIND RECORRE LA LISTA Y BUSCA AL PRIMER USUARIO QUE CUMPLA CON UNA CONDICIÓN */
    const usuarioEncontrado = usuarios.find(
      (user) => user.email === email && user.contrasena === contrasena
    );

    /* VALIDACIÓN SI EL USUARIO EXISTE */
    if (usuarioEncontrado) {
      alert("Login exitoso");
      navigate('/home')
    } else {
      alert("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="pagina-auth">
      <Tarjeta logo={true} titulo="Iniciar sesión" texto="¿No te has registrado aún? " linkTexto="Únete ahora"
      linkRuta="/">
        <form onSubmit={iniciarSesion}>
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <Button type="submit" estilo="verde" texto="Ingresar" pequeno/>
        </form>
      </Tarjeta>  
    </div>
  );
}

export default Login;