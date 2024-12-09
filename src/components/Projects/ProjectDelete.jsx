import React from "react";
import ProjectService from "../../services/ProjectService";

const ProjectDelete = ({ projectId, onDelete }) => {
  const handleDelete = () => {
    ProjectService.deleteProject(projectId)
      .then((response) => {
        console.log(response.data);
        onDelete(); // Llamada a la función pasada como prop para actualizar la lista
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
    >
      Delete
    </button>
  );
};

export default ProjectDelete;