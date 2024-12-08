import React, { useEffect, useState } from "react";
import ProjectService from "../../services/ProjectService";
import Button from "../Button/Button";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectList();
  }, []);

  const projectList = () => {
    ProjectService.getAllProjects().then((response) => {
      setProjects(response.data);
    });
  };

  return (
    <section className="w-[70%] mx-auto">
      <h2 className="flex justify-center my-8 text-3xl font-semibold">
        Project List
      </h2>
      <div className="flex justify-between items-center my-6">
        <Button
          text="Add Project"
          route="/projects/register"
          colorClass="bg-green-500 text-white hover:bg-green-600"
        />

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

          <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border border-gray-300 px-4 py-2">{project.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {project.startingDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">{project.finishedDate}</td>
              <td className="border border-gray-300 px-4 py-2">{project.status}</td>
              <td className="border border-gray-300 px-4 py-2">{project.taskType}</td>
              <td className="border border-gray-300 py-2 flex justify-around">
                <Button
                  text="Update Project"
                  route={`/projects/update/${project.id}`}
                  colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
        </thead>
      </table>
    </section>
  );
};

export default ProjectList;
