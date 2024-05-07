import React from "react";
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="wrapper">
      <form>
        <h1>Login</h1>
        <div className="BAdmin">
          <a href="/pag1"> {/* Utiliza <a> con href */}
            <button>Administrador</button>
          </a>
        </div>
        <div className="BTrabajador">
          <a href="/pag2"> {/* Utiliza <a> con href */}
            <button>Trabajador</button>
          </a>
        </div>
        <div className="BUsuario">
          <a href="/pag3">
            <button>Usuario</button>
          </a>
        </div>
      </form>
      <img className="foto" src="https://conadeipfba.org.mx/sites/default/files/dev1/sites/default/files/images/equipos/logos/zorros-mxl_1.png" alt="Zorros Logo" />
    </div>
  );
};

export default LoginForm;
