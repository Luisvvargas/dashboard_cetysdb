import React, { useState } from 'react';

const Ingresos = () => {
  const initialData = [
    { matricula: 12453, name: 'Jorge Octavio Chavez Rivero', tipo: 'Estudiante', area: 'Profesional', hora: '18:51:33' },
    { matricula: 13542, name: 'Josue Martinez Romero', tipo: 'Empleado', area: 'Profesional', hora: '18:51:02' },
    { matricula: 11435, name: 'Ivanna Carolina Vargas Peña', tipo: 'Estudiante', area: 'Preparatoria', hora: '18:48:43' },
    { matricula: 10342, name: 'Santiago Mercurio Camarena Renau', tipo: 'Estudiante', area: 'Profesional', hora: '18:44:59' },
    { matricula: 10322, name: 'Vladimir Ivan Vargas Ruiz', tipo: 'Visitante', area: '-', hora: '18:44:12' },
    { matricula: 13705, name: 'Laura Carolina Peña Sanchez', tipo: 'Visitante', area: '-', hora: '18:01:33' },
    { matricula: 13308, name: 'Carlos Andres Trasviña Moreno', tipo: 'Profesor', area: 'Profesional', hora: '17:13:10' },
    { matricula: 12456, name: 'Andrea Parra Nuñez', tipo: 'Alumni', area: 'Preparatoria', hora: '17:08:24' },
    { matricula: 12201, name: 'Jose Arcadio Ceja Pasos', tipo: 'Alumni', area: 'Profesional', hora: '16:46:27' },
    { matricula: 12089, name: 'Luis Armando Vargas Peña', tipo: 'Estudiante', area: 'Profesional', hora: '16:15:12' },
    { matricula: 14089, name: 'Stephania Ramos Nuñez', tipo: 'Estudiante', area: 'Profesional', hora: '15:55:49' },
    { matricula: 11679, name: 'Axel Moises Caldera Garcia', tipo: 'Estudiante', area: 'Profesional', hora: '15:49:08' },
    { matricula: 13678, name: 'Zarina Talamantes Alvarez', tipo: 'Profesor', area: 'Profesional', hora: '15:41:18' },
    { matricula: 10678, name: 'Jorge Fernandez Fernandez', tipo: 'Empleado', area: 'Preparatoria', hora: '13:33:33' },
    { matricula: 13567, name: 'Hiroshi Alvarez Morishita', tipo: 'Estudiante', area: 'Posgrado', hora: '13:29:08' },
    { matricula: 12478, name: 'Alonso Caleb Payan Inzunza', tipo: 'Estudiante', area: 'Posgrado', hora: '11:57:46' },
    { matricula: 12075, name: 'Nicolas Alejandro Escaroz Vazquez', tipo: 'Estudiante', area: 'Profesional', hora: '11:43:43' },
    { matricula: 13760, name: 'Mario Alberto Barrera Rodriguez', tipo: 'Estudiante', area: 'Profesional', hora: '10:12:41' },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [newUser, setNewUser] = useState({
    matricula: '',
    name: '',
    tipo: '',
    area: '',
    hora: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    setData((prevData) => [...prevData, { ...newUser, matricula: Number(newUser.matricula) }]);
    setNewUser({ matricula: '', name: '', tipo: '', area: '', hora: '' });
    setShowForm(false);
  };

  const handleDeleteUser = (matricula) => {
    setData((prevData) => prevData.filter((user) => user.matricula !== matricula));
  };

  const filteredData = data.filter((row) => {
    const matchesSearchTerm =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          className="mb-2 md:mb-0 md:mr-4 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
          value={filter}
          onChange={handleFilter}
          className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
        >
          {showForm ? 'Cerrar' : 'Agregar Usuario'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 border rounded-md dark:bg-gray-700 dark:border-gray-600">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Agregar Nuevo Usuario</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="matricula"
              placeholder="Matrícula"
              value={newUser.matricula}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={newUser.name}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo"
              value={newUser.tipo}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              name="area"
              placeholder="Área"
              value={newUser.area}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              name="hora"
              placeholder="Hora"
              value={newUser.hora}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900"
            >
              Agregar Usuario
            </button>
          </div>
        </div>
      )}

      <div className="shadow-md rounded-lg overflow-hidden flex-1">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white">Matricula</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white">Nombre</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white">Tipo</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white">Escuela</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white">Hora</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-900 dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.matricula} className="border-b dark:border-gray-700 relative">
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white">{row.matricula}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white">{row.name}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white">{row.tipo}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white">{row.area}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white">{row.hora}</td>
                <td className="py-2 px-4 text-sm text-gray-900 dark:text-white relative">
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === row.matricula ? null : row.matricula)}
                    className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
                  >
                    Acciones
                  </button>
                  {dropdownOpen === row.matricula && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 dark:bg-gray-700 dark:border-gray-600">
                      <ul>
                        <li>
                          <button
                            onClick={() => handleDeleteUser(row.matricula)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white dark:text-gray-300 dark:hover:bg-red-700"
                          >
                            Eliminar
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
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



