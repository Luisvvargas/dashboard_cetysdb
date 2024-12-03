import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

const Ingresos = () => {
  const socket = useContext(SocketContext);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [newVisitorName, setNewVisitorName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [visitorCounter, setVisitorCounter] = useState(1);

  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ingresos');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching ingresos:', error);
      }
    };

    fetchIngresos();

    const handleNuevoIngreso = (nuevoIngreso) => {
      setData(prevData => [nuevoIngreso, ...prevData]);
    };

    socket.on('actualizarIngresos', handleNuevoIngreso);

    return () => {
      socket.off('actualizarIngresos', handleNuevoIngreso);
    };
  }, [socket]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChange = (event) => {
    setNewVisitorName(event.target.value);
  };

  const handleAddUser = async () => {
    const formattedMatricula = String(visitorCounter).padStart(5, '0');
    const newVisitor = {
      matricula: formattedMatricula,
      nombre: newVisitorName,
      tipo: 'Visitante',
      area: '-',
      hora: new Date().toLocaleTimeString(),
    };

    try {
      await axios.post('http://localhost:8080/api/ingresos', newVisitor);
      socket.emit('nuevoIngreso', newVisitor);
      setNewVisitorName('');
      setShowForm(false);
      setVisitorCounter((prevCounter) => prevCounter + 1);
    } catch (error) {
      console.error('Error guardando visitante:', error);
    }
  };

  const handleDeleteUser = async (matricula) => {
    try {
      await axios.delete(`http://localhost:8080/api/ingresos/${matricula}`);
      setData((prevData) => prevData.filter((user) => user.matricula !== matricula));
      socket.emit('deleteIngreso', matricula);
    } catch (error) {
      console.error('Error eliminando ingreso:', error);
    }
  };

  const filteredData = data.filter((row) => {
    const matchesSearchTerm =
      row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.matricula.toString().includes(searchTerm);
    const matchesFilter = filter === 'Todos' || row.tipo === filter;

    return matchesSearchTerm && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 md:mb-0 md:mr-4 px-4 py-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-600 dark:text-white transition duration-200 ease-in-out transform focus:ring-2 focus:ring-[#FFD000] focus:border-[#FFD000]"
        />
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={handleFilter}
            className="px-4 py-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-600 dark:text-white transition duration-200 ease-in-out transform focus:ring-2 focus:ring-[#FFD000] focus:border-[#FFD000]"
          >
            <option value="Todos">Todos</option>
            <option value="Estudiante">Estudiante</option>
            <option value="Empleado">Empleado</option>
            <option value="Profesor">Profesor</option>
            <option value="Visitante">Visitante</option>
            <option value="Alumni">Alumni</option>
          </select>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-black text-white rounded-md hover:text-black dark:hover:bg-[#FFD000] transition duration-200 ease-in-out transform hover:scale-105 focus:ring-2"
          >
            {showForm ? 'Cerrar' : 'Agregar Visitante'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4 p-4 border rounded-md dark:bg-black dark:border-black transition duration-200 ease-in-out transform scale-95 opacity-0 animate-slide-up">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Agregar Nuevo Visitante</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre del Visitante"
              value={newVisitorName}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-100 dark:border-gray-600 dark:text-black transition duration-200 ease-in-out transform focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 transition duration-200 ease-in-out transform hover:scale-95 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              Agregar Visitante
            </button>
          </div>
        </div>
      )}

      <div className="shadow-md rounded-lg overflow-hidden flex-1">
        <table className="min-w-full bg-white dark:bg-gray-100">
          <thead className="bg-gray-50 dark:bg-black">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Matricula</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Nombre</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Tipo</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Escuela</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Hora</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.matricula} className="border-b dark:border-gray-700">
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-extrabold">{row.matricula}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold">{row.nombre}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold">{row.tipo}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold">{row.area}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold">{row.hora}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold">
                  <button
                    onClick={() => handleDeleteUser(row.matricula)}
                    className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-900 transition duration-200 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ingresos;