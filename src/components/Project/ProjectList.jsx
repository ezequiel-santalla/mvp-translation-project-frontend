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

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const location = useLocation();
  const { name, lastName, email } = location.state || {};

  const projectList = () => {
    if (email) {
      UserService.getProjectsByUserEmail(email)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    } else {
      ProjectService.getAllProjects()
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  };

  const handleFilter = (column, value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = projects.filter((project) => {
      const columnValue = project[column]?.toString().toLowerCase();
      return columnValue?.includes(lowercasedValue);
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
        data={projects}
        RowComponent={ProjectRow}
        onDelete={handleDelete}
      />
    </section>
  );
};
