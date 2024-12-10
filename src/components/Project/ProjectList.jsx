import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import { FilterActions } from "../FilterActions/FilterActions";
import { Table } from "../Table/Table";
import { ProjectRow } from "./ProjectRow";
import ProjectService from "../../services/ProjectService";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const projectList = () => {
    ProjectService.getAllProjects()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  const handleDelete = (projectId) => {
    ProjectService.deleteProject(projectId)
      .then(() => {
        projectList();
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  const headers = [
    "Name",
    "Translator",
    "Starting Date",
    "Finished Date",
    "Status",
    "Task Type",
    "Actions",
  ];

  useEffect(() => {
    projectList();
  }, []);

  return (
    <section className="w-[90%] mx-auto">
      <Title title="Project List" />
      <div className="flex justify-between items-center my-6">
        <Link to="/projects/register">
          <Button
            text="Add Project"
            colorClass="bg-green-500 text-white hover:bg-green-600"
          />
        </Link>
        <FilterActions />
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
