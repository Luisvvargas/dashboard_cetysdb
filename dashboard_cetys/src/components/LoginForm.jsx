import React from "react";
import './LoginForm.css';
import Unumber from "./unumber";

import { useNavigate } from "react-router-dom"

const LoginForm = () => {

  const navigate = useNavigate();

  return (
    <div className="body-form">
      <div className="wrapper">
        <form>
          <h1>Login</h1>
          <div className="BAdmin">
              <button onClick={()=> navigate('/Admin')}>Administrador</button>
          </div>
          <div className="BTrabajador">
            <button onClick={() => navigate('/Empleado')}>Empleado</button>
          </div>
          <div className="BUsuario">
              <button onClick={() => navigate('/Usuario')}>Usuario</button>
          </div>
        </form>
        <img className="foto" src="https://conadeipfba.org.mx/sites/default/files/dev1/sites/default/files/images/equipos/logos/zorros-mxl_1.png" alt="Zorros Logo" />
      </div>
    </div>
  );
};

export default LoginForm;
