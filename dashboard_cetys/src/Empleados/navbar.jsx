import React from "react";

import { useNavigate } from "react-router-dom"

const NavBar = () => {

    const navigate = useNavigate();

  return (
    <header className="text-gray-600 body-font bg-cover bg-black">
  <div className="container ml-5 mr-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <image href="https://conadeipfba.org.mx/sites/default/files/dev1/sites/default/files/images/equipos/logos/zorros-mxl_1.png" height="40" width="40"/>
      </svg>
      <span className="ml-3 text-xl text-white font-semibold">Biblioteca CETYS</span>
    </a>
    <nav className="flex-grow md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex">
      <button className="mr-5 inline-block py-1 text-white hover:text-yellow-400 hover:scale-95 cursor-pointer font-light" onClick={() => navigate('/Empleado')}>Inicio</button>
      <button className="mr-5 inline-block py-1 text-white hover:text-yellow-400 hover:scale-95 cursor-pointer font-light" onClick={() => navigate('/Ingresos')}>Ingresos</button>
      <button className="mr-5 inline-block py-1 text-white hover:text-yellow-400 hover:scale-95 cursor-pointer font-light" onClick={() => navigate('/Reportes')}>Reportes</button>
      <div className="ml-auto">
        <button className="py-1 text-white hover:text-yellow-400 hover:scale-95 cursor-pointer font-light" onClick={() => navigate('/')}>Log Out</button>
      </div>
    </nav>
  </div>
</header>
  )
}

export default NavBar;
