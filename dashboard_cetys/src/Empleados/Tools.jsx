import React, { useEffect, useState } from "react";
import axios from 'axios';

const Tools = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    matricula: '',
    nombre: '',
    carrera: ''
  });

  useEffect(() => {
    fetchStudents();
  }, [filter]);

  const fetchStudents = async () => {
    try {
      const url = filter
        ? `http://localhost:8080/api/users/carrera/${filter}`
        : 'http://localhost:8080/api/users';
      const response = await axios.get(url);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setNewStudent({ matricula: '', nombre: '', carrera: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(`http://localhost:8080/api/users/${editingStudent.matricula}`, {
          nombre: newStudent.nombre,
          carrera: newStudent.carrera
        });
      } else {
        await axios.post('http://localhost:8080/api/users', newStudent);
      }
      setShowModal(false);
      setEditingStudent(null);
      fetchStudents();
      setNewStudent({ matricula: '', nombre: '', carrera: '' });
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Error al guardar el estudiante');
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setNewStudent({
      matricula: student.matricula,
      nombre: student.nombre,
      carrera: student.carrera
    });
    setShowModal(true);
  };

  const handleDelete = async (matricula) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${matricula}`);
        setStudents(students.filter(student => student.matricula !== matricula));
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error al eliminar el estudiante');
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.matricula} ${student.nombre}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen flex flex-col">
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4 dark:text-white">
              {editingStudent ? 'Editar Estudiante' : 'Agregar Estudiante'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Matrícula"
                value={newStudent.matricula}
                onChange={(e) => setNewStudent({ ...newStudent, matricula: e.target.value })}
                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={editingStudent}
                required
              />
              <input
                type="text"
                placeholder="Nombre"
                value={newStudent.nombre}
                onChange={(e) => setNewStudent({ ...newStudent, nombre: e.target.value })}
                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <select
                value={newStudent.carrera}
                onChange={(e) => setNewStudent({ ...newStudent, carrera: e.target.value })}
                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Seleccionar carrera</option>
                <option value="ISW">ISW</option>
                <option value="IMEC">IMEC</option>
                <option value="IER">IER</option>
                <option value="IIND">IIND</option>
                <option value="IDGD">IDGD</option>
                <option value="LINI">LINI</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingStudent(null);
                    setNewStudent({ matricula: '', nombre: '', carrera: '' });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {editingStudent ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  <td className="py-2 px-4 text-sm text-gray-900 dark:text-black font-semibold space-x-2">
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 transition duration-200 ease-in-out transform hover:scale-105 focus:ring-2"
                      onClick={() => handleEdit(student)}
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
                <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-black">
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