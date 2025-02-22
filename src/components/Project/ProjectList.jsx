/* eslint-disable no-undef */
/* eslint-disable valid-typeof */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import { FilterActions } from "../FilterActions/FilterActions";
import { Table } from "../Table/Table";
import { ProjectRow } from "./ProjectRow";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import ProjectService from "../../services/ProjectService";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const location = useLocation();
  const { name, lastName, email } = location.state || {};

  const projectList = () => {
    if (localStorage.getItem("role") === "TRANSLATOR") {
      UserService.getMyProjects()
        .then((response) => {
          setProjects(response.data);
          setFilteredProjects(response.data); // Actualiza también el estado filteredProjects
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    } else {
      if (email) {
        UserService.getProjectsByUserEmail(email)
          .then((response) => {
            setProjects(response.data);
            setFilteredProjects(response.data); // Actualiza también el estado filteredProjects
          })
          .catch((error) => {
            console.error("Error fetching projects:", error);
          });
      } else {
        ProjectService.getAllProjects()
          .then((response) => {
            setProjects(response.data);
            setFilteredProjects(response.data); // Actualiza también el estado filteredProjects
          })
          .catch((error) => {
            console.error("Error fetching projects:", error);
          });
      }
    }
  };
/*
  const handleFilter = (column, value) => {
    const lowercasedValue = typeof value === "string" ? value.toLowerCase() : value;

    const lowercasedColumn= column.toLowerCase();

    const filtered = projects.filter((project) => {
      const columnValue = project[lowercasedColumn]?.toString().toLowerCase();
      console.log(lowercasedColumn);
      console.log(lowercasedValue);
      console.log(columnValue);

      return columnValue?.includes(lowercasedValue);
    });
    setFilteredProjects(filtered); 
  };
*/

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+(\w)/g, (match, letter) => letter.toUpperCase());
};

const handleFilter = (column, value) => {
  if (!column || value == null) return;

  const lowercasedValue = typeof value === "string" ? value.toLowerCase() : value;
  const camelCaseColumn = toCamelCase(column);
  const filtered = projects.filter((project) => {
    let columnValue = project[camelCaseColumn];

    // Si el valor es un objeto, intenta acceder a una propiedad representativa
    if (typeof columnValue === "object" && columnValue !== null) {
      columnValue = columnValue.name || columnValue.toString();
    }

    // Si es una fecha en formato ISO, conviértela a un formato legible
    if (typeof columnValue === "string" && columnValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
      columnValue = new Date(columnValue).toLocaleDateString();
    }
    if (camelCaseColumn === "languagePair") {
      columnValue = project.languagePair?.sourceLanguage?.name; // Usa optional chaining para evitar errores si falta algún campo
    }
    

    // Convierte a minúsculas solo si es un string
    const normalizedColumnValue = typeof columnValue === "string" ? columnValue.toLowerCase() : columnValue;
   
    console.log(camelCaseColumn);
    console.log(normalizedColumnValue);
    console.log(lowercasedValue);
    console.log(columnValue);

    console.log(projects);

    return normalizedColumnValue?.includes(lowercasedValue);
  });

  
  setFilteredProjects(filtered);
};

  const handleReset = () => {
    setFilteredProjects(projects); // Vuelve a mostrar todos los proyectos
  };

  const { handleDelete } = useDeleteConfirmation((projectId) => {
    ProjectService.deleteProject(projectId)
      .then(() => {
        projectList();
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        Swal.fire(
          "Error!",
          "There was an issue deleting the project.",
          "error"
        );
      });
  });

  const headers = [
    "Name",
    "Translator",
    "Task Type",
    "Language Pair",
    "Status",
    "Starting Date",
    "Finished Date",
    "Actions",
  ];

  useEffect(() => {
    projectList();
  }, [email]);

  const title =
    name && lastName ? `Project List of ${name} ${lastName}` : "Project List";

  return (
    <section className="w-[90%] mx-auto">
      <Title title={title} />

      <div className="flex justify-between items-center my-6">
        <Link to="/projects/register">
          <Button
            text="Add Project"
            colorClass="bg-green-500 text-white hover:bg-green-600"
          />
        </Link>
        <FilterActions columns={headers} onFilter={handleFilter} onReset={handleReset} />
      </div>

      <Table
        headers={headers}
        data={filteredProjects} // Usa filteredProjects en lugar de projects
        RowComponent={ProjectRow}
        onDelete={handleDelete}
      />
    </section>
  );
};