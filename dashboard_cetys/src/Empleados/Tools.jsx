import React, { useEffect, useState } from "react";

const Tools = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/students"); //API KEY
      const data = await response.json();
      setStudents(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = students;  

    if (filter) {
      filtered = filtered.filter((student) => student.carrera === filter);
    }
    if (searchTerm) {
      filtered = filtered.filter((student) =>
        `${student.matricula} ${student.nombre}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
    setFilteredStudents(filtered);
  }, [searchTerm, filter, students]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE",
    });
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleAdd = () => {
    // Lógica para abrir un modal para agregar estudiante
  };

  const handleEdit = (id) => {
    // Lógica para abrir un modal para editar estudiante
  };

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen flex flex-col">
      {/* Controles de Filtro y Búsqueda */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Buscar..."
          className="mb-2 md:mb-0 md:mr-4 px-4 py-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-600 dark:text-white transition duration-200 ease-in-out transform focus:ring-2 focus:ring-[#FFD000] focus:border-[#FFD000]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-600 dark:text-white transition duration-200 ease-in-out transform focus:ring-2 focus:ring-[#FFD000] focus:border-[#FFD000]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Todas las carreras</option>
            <option value="ISW">ISW</option>
            <option value="IMEC">IMEC</option>
            <option value="IER">IER</option>
            <option value="IIND">IIND</option>
            <option value="IDGD">IDGD</option>
            <option value="LINI">LINI</option>
          </select>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-black text-white rounded-md hover:text-black dark:hover:bg-[#FFD000] transition duration-200 ease-in-out transform hover:scale-105 focus:ring-2"
          >
            Agregar Estudiante
          </button>
        </div>
      </div>

      {/* Tabla de Estudiantes */}
      <div className="shadow-md rounded-lg overflow-hidden flex-1">
        <table className="min-w-full bg-white dark:bg-gray-100">
          <thead className="bg-gray-50 dark:bg-black">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Matrícula</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Nombre</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Carrera</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-[#FFD000]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.matricula} className="border-b dark:border-gray-700">
                  <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-extrabold">{student.matricula}</td>
                  <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold">{student.nombre}</td>
                  <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold">{student.carrera}</td>
                  <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold">
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 transition duration-200 ease-in-out transform hover:scale-105 focus:ring-2"
                      onClick={() => handleEdit(student.matricula)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 transition duration-200 ease-in-out transform hover:scale-105 focus:ring-2"
                      onClick={() => handleDelete(student.matricula)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-black ">
                  No se encontraron estudiantes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tools;
