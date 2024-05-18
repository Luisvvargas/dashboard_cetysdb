import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChartSimple, faNoteSticky, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';


const Ingresos = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Inicio", src: <FontAwesomeIcon icon={faHouse} size="lg"/> },
    { title: "Ingresos", src: <FontAwesomeIcon icon={faChartSimple} size="lg"/>},
    { title: "Reportes", src: <FontAwesomeIcon icon={faNoteSticky} size="lg"/>},
    { title: "Log Out", src: <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg"/>}
   
  ];

  const handleMenuClick = (title) => {
    switch(title) {
      case "Dashboard":
        console.log("Dashboard");
        break;
      case "Inicio":
        console.log("Inicio");
        break;
      case "Ingresos":
        console.log("Ingresos");
        break;
      case "Reportes":
        console.log("Reportes");
        break;
      case "Log Out":
        console.log("Log Out");
        break;
    }
  };

  return (
    <div className="flex">
      <div
        className={`${open ? "w-40" : "w-20"} bg-black h-screen p-5 pt-8 relative duration-300`}
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
        <ul className="pt-6">
  {Menus.map((menu, index) => (
    <li
      key={index}
      onClick={() => handleMenuClick(menu.title)}
      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
      ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
    >
      {/* Conditional rendering to check if src is a string or JSX element */}
      {typeof menu.src === "string" ? (
        <img src={`./src/assets/${menu.src}.png`} alt={menu.title} />
      ) : (
        <span className="icon">{menu.src}</span>
      )}
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {menu.title}
      </span>
    </li>
  ))}
</ul>

      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Inicio</h1>
      </div>
    </div>
  );
};

export default Ingresos;
