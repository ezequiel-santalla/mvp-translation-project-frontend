/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "../Button/Button";

export const FilterActions = ({ columns, onFilter, onReset }) => {
  const [selectedColumn, setSelectedColumn] = useState(columns[0]); // Inicializa con la primera columna
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilterClick = () => {
    onFilter(selectedColumn, filterValue); // Pasa los valores al componente padre para que realice el filtrado
  };

  const handleResetClick = () => {
    setFilterValue(""); // Limpiar el valor del filtro
    onReset(); // Resetea los proyectos en el componente padre
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        className="border border-gray-300 p-2 rounded-md"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
      >
        {columns.map((col, index) => (
          <option key={index} value={col}>
            {col}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md"
        value={filterValue}
        onChange={handleFilterChange}
        placeholder={`Filter by ${selectedColumn}`}
      />

      <Button
        text="Filter"
        colorClass="bg-blue-500 text-white hover:bg-blue-600"
        onClick={handleFilterClick}
      />

      <Button
        text="Reset filter"
        colorClass="bg-gray-500 text-white hover:bg-gray-600"
        onClick={handleResetClick}
      />
    </div>
  );
};
