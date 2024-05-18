import { faArrowRightFromBracket, faChartSimple, faHouse, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

// IMPORTS PARA GRAFICAS
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InicioAd = () => {
  const [open, setOpen] = useState(false);
  const [matricula, setMatricula] = useState('');

  const Menus = [
    { title: "Inicio", src: <FontAwesomeIcon icon={faHouse} size="lg" style={{ color: "#FFD000" }} /> },
    { title: "Ingresos", src: <FontAwesomeIcon icon={faChartSimple} size="lg" /> },
    { title: "Reportes", src: <FontAwesomeIcon icon={faNoteSticky} size="lg" /> },
  ];

  const LogoutMenu = { title: "Log Out", src: <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /> };

  const handleMenuClick = (title) => {
    switch (title) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Matrícula ingresada:", matricula);
    // Aquí puedes agregar la lógica para manejar la matrícula ingresada
  };

  // DATA GRAFICAS
  const data = {
    labels: ['Escuela de Ingeniería', 'Escuela de Negocios', 'Preparatoria', 'Posgrado', 'Empleados'],
    datasets: [
      {
        label: 'Entradas de hoy',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(245, 232, 39, 0.44)',
        borderColor: 'rgba(255, 208, 0, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255,255,255,1)', // White points
        pointBorderColor: 'rgba(0,0,0,0.8)', // Black borders for points
        pointBorderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

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
    <div className="flex bg-gray-50">
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

      {/* Aquí empieza la parte de la derecha de la página, fuera del navbar */}
      <div className="flex-1 flex justify-center items-center">
        <div className=" flex flex-col justify-start items-center">
          {/* <h1 className="text-3xl font-semibold mb-8">Inicio</h1> */}
          <div className="flex justify-between items-center w-full">
            <section className="text-gray-600 body-font flex-grow">
              <div className="container mx-auto">
                <div className="flex flex-wrap -m-4 text-center">
                  {["2.7K Users", "1.8K Subscribes", "35 Downloads", "4 Products"].map((item, index) => (
                    <div className="p-4 sm:w-1/4 w-1/2" key={index}>
                      <div className="px-6 py-4 bg-white shadow-xl rounded-lg">
                        <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{item.split(' ')[0]}</h2>
                        <p className="leading-relaxed">{item.split(' ')[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <form onSubmit={handleSubmit} className="flex items-center space-x-4 ml-4 bg-white py-3 px-6 shadow-lg rounded-lg">
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Ingrese matrícula"
                className="px-4 py-2 border rounded-md"
              />
              <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                Enviar
              </button>
            </form>
          </div>
          <div className="w-full mt-10">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioAd;