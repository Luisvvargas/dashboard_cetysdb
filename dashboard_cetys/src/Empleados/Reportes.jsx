import React, { useState } from 'react';

const sections = {
  'Escuela de Ingeniería': [],  
  'Escuela de Negocios': [],  
  'Preparatoria': [],
  'Postgrado': [],
  'Empleados': [],
};

const Reportes = () => {
  const [selectedSections, setSelectedSections] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleExport = () => {
    if (selectedSections.length === 0) return;

    const csvRows = [
      ['Section', 'Name', 'Age', 'Grade'],
      ...selectedSections.flatMap(section =>
        sections[section].map(student => [section, student.name, student.age, student.grade])
      )
    ];

    const csvContent = "data:text/csv;charset=utf-8,"
      + csvRows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const filename = `selected_sections_${startDate}_${startTime}_to_${endDate}_${endTime}.csv`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSections(prev =>
      checked ? [...prev, value] : prev.filter(section => section !== value)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reportes</h1>
      <div className="flex">
        <div className="w-1/2 p-4 border-r border-gray-300 shadow-lg">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Selecciona los tipos de información</label>
            {Object.keys(sections).map(section => (
              <div key={section} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={section}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={selectedSections.includes(section)}
                    onChange={handleSelectionChange}
                  />
                  <span className="ml-2">{section}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 p-4 shadow-lg">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Selecciona la fecha de inicio</label>
            <input
              type="date"
              className="form-input mt-1 block w-full bg-gray-200"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Selecciona la fecha de finalización</label>
            <input
              type="date"
              className="form-input mt-1 block w-full bg-gray-200"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Selecciona la hora de inicio</label>
            <input
              type="time"
              className="form-input mt-1 block w-full bg-gray-200"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Selecciona la hora de finalización</label>
            <input
              type="time"
              className="form-input mt-1 block w-full bg-gray-200"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleExport}
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-[#FFD000] hover:text-black"
        disabled={selectedSections.length === 0}
      >
        Export to CSV
      </button>
    </div>
  );
};

export default Reportes;
