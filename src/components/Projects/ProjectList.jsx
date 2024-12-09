import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa el componente Link
import { format } from "date-fns";
import ProjectService from "../../services/ProjectService";
import { Button } from "../Button/Button";
import { ProjectDelete } from "../Projects/ProjectDelete";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectList();
  }, []);

  const projectList = () => {
    ProjectService.getAllProjects()
      .then((response) => {
        console.log("Projects data:", response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  const formatDateTime = (date) => {
    return date ? format(new Date(date), "yyyy/MM/dd HH:mm:ss") : "N/A";
  };

  return (
    <section className="w-[80%] mx-auto">
      <h2 className="flex justify-center my-8 text-3xl font-semibold">
        Project List
      </h2>
      <div className="flex justify-between items-center my-6">
        <Link to="/projects/register"><Button
          text="Add Project"
          colorClass="bg-green-500 text-white hover:bg-green-600"
        /></Link>

        <div className="flex items-center space-x-4">
          <Button
            text="Filter"
            colorClass="bg-blue-500 text-white hover:bg-blue-600"
          />
          <Button
            text="Reset filter"
            colorClass="bg-gray-500 text-white hover:bg-gray-600"
          />
        </div>
      </div>

      <table className="mt-8 w-full table-auto border-collapse border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Translator
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Starting date
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Finished Date
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Task type
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
                <Link to={`/projects/${project.id}`}>{project.name}</Link>{" "}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {project.translator
                  ? `${project.translator.name} ${project.translator.lastName}`
                  : "N/A"}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {formatDateTime(project.startingDate)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {formatDateTime(project.finishedDate)}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {project.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {project.taskType}
              </td>
              <td className="border border-gray-300 py-2 flex justify-around">
                <Button
                  text="Update"
                  route={`/projects/update/${project.id}`}
                  colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
                />
                <ProjectDelete
                  projectId={project.id}
                  onDelete={projectList} // Se pasa la función para actualizar la lista
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProjectList;
