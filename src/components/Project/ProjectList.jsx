/* eslint-disable no-undef */
/* eslint-disable valid-typeof */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import { FilterActions } from "../FilterActions/FilterActions";
import { Table } from "../Table/Table";
import { ProjectRow } from "./ProjectRow";
import { useConfirmationAction } from "../../hooks/useConfirmationAction";
import ProjectService from "../../services/ProjectService";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const location = useLocation();
  const { name, lastName, email } = location.state || {};

  const flattenProject = (project) => ({
    id: project.id,
    name: project.name,
    translator: project.translator
      ? `${project.translator.name} ${project.translator.lastName}`
      : "N/A",
    taskType: project.taskType,
    languagePair: project.languagePair
      ? `${project.languagePair.sourceLanguage.codeIso.toUpperCase()} - ${project.languagePair.targetLanguage.codeIso.toUpperCase()}`
      : "N/A",
    sourceFlag: project.languagePair?.sourceLanguage?.flagCode || null,
    targetFlag: project.languagePair?.targetLanguage?.flagCode || null,
    status: project.status,
    startingDate: project.startingDate,
    finishedDate: project.finishedDate,
  });

  const projectList = () => {

    let fetchProjects;
    const role = localStorage.getItem("role");
    
    if (role === "TRANSLATOR") {
      fetchProjects = UserService.getMyProjects();
    } else if (role === "ADMIN" || role === "ROOT") {
      if (email) {
        fetchProjects = UserService.getProjectsByUserEmail(email);
      } else {
        fetchProjects = ProjectService.getAllProjects();
      }
    } else return;

    fetchProjects
      .then((response) => {
        const transformedProjects = response.data.map(flattenProject);
        setProjects(transformedProjects);
        setFilteredProjects(transformedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+(\w)/g, (match, letter) => letter.toUpperCase());
  };

  const handleFilter = (column, value) => {
    if (!column || value == null) return;

    let lowercasedValue =
      typeof value === "string" ? value.toLowerCase() : value;
    const camelCaseColumn = toCamelCase(column);
    const filtered = projects.filter((project) => {
      let columnValue = project[camelCaseColumn];

      if (camelCaseColumn.includes("Date")) {
        lowercasedValue = lowercasedValue.replace(/\//, "-");
      }

      // Convierte a minúsculas solo si es un string
      const normalizedColumnValue =
        typeof columnValue === "string"
          ? columnValue.toLowerCase()
          : columnValue;

      return normalizedColumnValue?.includes(lowercasedValue);
    });

    setFilteredProjects(filtered);
  };

  const handleReset = () => {
    setFilteredProjects(projects); // Vuelve a mostrar todos los proyectos
  };

  const { handleAction: handleDelete } = useConfirmationAction((projectId) => {
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
  }, "delete");

  const { handleAction: handleMarkAsCompleted } = useConfirmationAction(
    (projectId) => {
      ProjectService.finishProject(projectId)
        .then(() => {
          projectList(); // Refresca la lista de proyectos
        })
        .catch((error) => {
          console.error("Error changing status project:", error);
          Swal.fire("Error!", "Failed to process status change", "error");
        });
    },
    "finish"
  );

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

  const filters = [
    "Name",
    "Translator",
    "Task Type",
    "Language Pair",
    "Status",
    "Starting Date",
    "Finished Date",
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
        {["ADMIN", "ROOT"].includes(localStorage.getItem("role")) && (
          <Link to="/projects/register">
            <Button
              text="Add Project"
              colorClass="bg-green-500 text-white hover:bg-green-600"
            />
          </Link>
        )}
        <div className="ml-auto">
          <FilterActions
            columns={filters}
            onFilter={handleFilter}
            onReset={handleReset}
          />
        </div>
      </div>

      <Table
        headers={headers}
        data={filteredProjects} // Usa filteredProjects en lugar de projects
        RowComponent={ProjectRow}
        onDelete={handleDelete}
        onComplete={handleMarkAsCompleted} // 🔹 Pasamos la función aquí
      />
    </section>
  );
};
