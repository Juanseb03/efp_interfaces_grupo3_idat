/* react-router-dom ES UNA HERRAMIENTA PARA MANEJAR RUTAS, 
SE DEBE INSTALAR EN LA TERMINAL INGRESANDO: npm install react-router-dom */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./paginas/Register";
import Login from "./paginas/Login";
import Home from "./paginas/Home";
import './App.css';

const App = () => {
  /* BrowserRouter ES EL SISTEMA DE NAVEGACION */
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;