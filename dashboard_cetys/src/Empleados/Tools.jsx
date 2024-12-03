import React, { useState, useEffect } from "react";

const Tools = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/students");
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
    <div className="flex flex-col h-screen w-full p-6 bg-gray-100">
      {/* Controles de Filtro y Búsqueda */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Buscar por matrícula o nombre"
          className="input input-bordered w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Todas las carreras</option>
          <option value="Ingeniería">Ingeniería</option>
          <option value="Medicina">Medicina</option>
          <option value="Derecho">Derecho</option>
          {/* Agrega más opciones según tus datos */}
        </select>
        <button className="btn btn-primary" onClick={handleAdd}>
          Agregar Estudiante
        </button>
      </div>

      {/* Tabla de Estudiantes */}
      <div className="flex-grow overflow-auto">
        <table className="table-auto w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Matrícula</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Carrera</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.matricula} className="border-t">
                  <td className="p-3">{student.matricula}</td>
                  <td className="p-3">{student.nombre}</td>
                  <td className="p-3">{student.carrera}</td>
                  <td className="p-3">
                    <button
                      className="btn btn-sm btn-warning mr-2"
                      onClick={() => handleEdit(student.matricula)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(student.matricula)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
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
