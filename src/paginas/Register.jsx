import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

/* PARA NAVEGAR ENTRE PÁGINAS */
import { useNavigate } from "react-router-dom";

/* COMPONENTES */
import Tarjeta from "../componentes/Tarjeta";
import Input from "../componentes/Input";
import Button from "../componentes/Button";

import "../estilos/Auth.css"

const Register = () => {
  /* EN useState, PRIMERO SE DEFINE EL ESTADO ACTUAL (EJM: email), 
  DESPUÉS SE DEFINE UNA FUNCIÓN PARA PODER ACTUALIZAR ESE VALOR (EJM: setEmail) 
  Y POR ULTIMO useState("") DEFINE EL VALOR INICIAL */
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  /* PARA EL useEffect */
  const [usuarios, setUsuarios] = useState([]);

  /* PARA NAVEGAR ENTRE PÁGINAS */
  const navigate = useNavigate();

  /* useEffect ES PARA EJECUTAR CÓDIGO AUTOMATICAMENTE EN CIERTOS MOMENTOS */
  /* PARA CARGAR USUARIOS */
  useEffect(() => {
    const datos = localStorage.getItem("usuarios"); /* LOCALSTORAGE ES LA MEMORIA DEL NAVEGADOR */
    if (datos) {
      setUsuarios(JSON.parse(datos)); /*SI HAY DATOS LOS GUARDA Y JSON.PARSE LO CONVIERTE DE TEXTO A OBJETO*/
    }
  }, []); /*[] SIGNIFICA QUE CUANDO LA PÁGINA CARGUE, LA FUNCIÓN SE EJECUTARÁ UNA SOLA VEZ */

  /* GUARDAR USUARIOS */
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]); /* [USUARIOS] SIGNIFICA QUE CUANDO USUARIOS CAMBIE SE EJECUTE, ES UNA DEPENDENCIA */

  const guardarUsuario = (e) => {
    e.preventDefault();

    const nuevo_usuario = {
        email,
        contrasena,
    };

    /* AÑADE LOS NUEVOS USUARIOS SIN BORRAR LOS ANTERIORES GRACIAS A prev. 
    ...prev COPIA LO QUE HABIA EN LA LISTA ANTERIOR */
    setUsuarios(prev => [...prev, nuevo_usuario]);
    setEmail("");
    setContrasena("");

    navigate("/login"); /* TE ENVÍA A LA PÁGINA DE LOGIN */
  };

  return(
    <div className="pagina-auth">
      <Tarjeta 
        logo={true}
        titulo="Regístrate" 
        texto="¿Ya tienes una cuenta? "
        linkTexto="Inicia sesión"
        linkRuta="/login"
      >

      <form onSubmit={guardarUsuario}>
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} /* onChange INDICA UN EVENTO, ES EL EVENTO QUE CAMBIO EN ESTE CASO ES EL INPUT INDICADO CON TARGET Y VALUE ES EL VALOR INGRESADO EN EL INPUT */
          required
        />
        <Input
          label="Contraseña"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <Button type="submit" estilo="verde" texto="Registrarse" pequeno/>
        <hr/>
        <Button type="button" estilo='google-btn' texto="Continuar con Google" icono={<FaGoogle size={17}/>} pequeno/>
      </form>
    </Tarjeta>
    </div>
  )
};

export default Register;