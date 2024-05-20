import { faArrowRightFromBracket, faChartSimple, faHouse, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

// Navegate
import { useNavigate } from "react-router-dom"



const NB = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [matricula, setMatricula] = useState('');

  const Menus = [
    { title: "Inicio", src: <FontAwesomeIcon icon={faHouse} size="lg" /> },
    { title: "Ingresos", src: <FontAwesomeIcon icon={faChartSimple} size="lg" /> },
    { title: "Reportes", src: <FontAwesomeIcon icon={faNoteSticky} size="lg" /> },
  ];

  const LogoutMenu = { title: "Log Out", src: <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /> };

  const handleMenuClick = (title) => {
    switch (title) {
      case "Inicio":
        console.log("Inicio");
        navigate("/Empleado")
        break;
      case "Ingresos":
        console.log("Ingresos");
        navigate("/Ingresos")
        break;
      case "Reportes":
        navigate("/Reportes")
        console.log("Reportes");
        break;
      case "Log Out":
        navigate("/")
        console.log("/Log Out");
        break;
    }
  };

  const styles = () => {

  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución por Escuela',
      },
    },
  };

  return (
    <div className="flex bg-gray-50 fixed">
      <div
        className={`${open ? "w-40" : "w-20"} bg-black h-screen p-5 pt-8 relative duration-300 flex flex-col`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-5 top-8 w-10 border-transparent
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
        </div>
        <ul className="pt-6 flex-1">
          {Menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(menu.title)}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#FFD000] text-gray-300 text-m items-center gap-x-4 
                ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
            >
              <span className="icon">{menu.src}</span>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
        <div
          onClick={() => handleMenuClick(LogoutMenu.title)}
          className="mt-auto p-2 cursor-pointer hover:bg-red-700 text-gray-300 flex rounded-md items-center gap-x-4 text-m transition duration-200"
        >
          <span className="icon">{LogoutMenu.src}</span>
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            {LogoutMenu.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NB;
