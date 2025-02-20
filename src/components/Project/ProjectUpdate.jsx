import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import ProjectService from "../../services/ProjectService";
import Swal from "sweetalert2";
import { format } from "date-fns";

export const ProjectUpdate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filePath, setFilePath] = useState("");
  const [taskType, setTaskType] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [flatFee, setFlatFee] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      ProjectService.getProjectById(projectId)
        .then((response) => {
          const project = response.data;
          setName(project.name);
          setDescription(project.description);
          setDeadline(format(new Date(project.deadline), "yyyy-MM-dd"));
          setFilePath(project.filePath);
          setTaskType(project.taskType);
          setSourceLanguage(project.languagePair.sourceLanguage.value);
          setTargetLanguage(project.languagePair.targetLanguage.value);
          setPaymentType(project.projectPayment.paymentType);
          console.log(project.projectPayment.paymentType);
          setFlatFee(project.flatFee);
          setRate(project.rate);
          setQuantity(project.quantity);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [projectId]);

  const updateProject = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this project?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const formattedDeadline = format(new Date(deadline), "yyyy-MM-dd'T'HH:mm:ss");

        const languagePair = {
          sourceLanguage,
          targetLanguage
        };

        const updatedProject = {
          name,
          description,
          deadline: formattedDeadline,
          filePath,
          taskType,
          languagePair,
          paymentType,
          flatFee: paymentType === "Flat Fee" ? flatFee : null,
          rate: paymentType === "Rate Based" ? rate : null,
          quantity: paymentType === "Rate Based" ? quantity : null,
        };

        ProjectService.updateProject(projectId, updatedProject)
          .then(() => {
            Swal.fire(
              'Updated!',
              'The project has been updated.',
              'success'
            ).then(() => {
              navigate("/projects");
            });
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'There was an error updating the project.',
              'error'
            );
            console.log(error.response.data);
          });
      }
    });
  };

  return (
    <section className="w-[35%] mx-auto bg-white">
      <Title title="Project Update" />
      <form onSubmit={updateProject} className="space-y-6" autoComplete="on">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Project Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name" autoComplete="given-name" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="deadline">Deadline</label>
          <input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
            autoComplete="bday" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="filePath">File Path</label>
          <input id="filePath" type="text" value={filePath} onChange={(e) => setFilePath(e.target.value)}
            placeholder="Enter file path" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="taskType">Task Type</label>
          <select id="taskType" value={taskType} onChange={(e) => setTaskType(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md">
            <option value="">Select task type</option>
            <option value="TRANSLATION">Translation</option>
            <option value="REVISION">Revision</option>
            <option value="LQA">LQA</option>
            <option value="LSO">LSO</option>
            <option value="DTP">DTP</option>
            <option value="TRANSCRIPTION">Transcription</option>
            <option value="SUBTITLED">Subtitled</option>
            <option value="LOCALIZATION">Localization</option>
            <option value="TRANSCREATION">Transcreation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="sourceLanguage">Source Language</label>
          <input id="sourceLanguage" type="text" value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}
            placeholder="Enter source language" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="targetLanguage">Target Language</label>
          <input id="targetLanguage" type="text" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}
            placeholder="Enter target language" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="paymentType">Payment Type</label>
          <select id="paymentType" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md">
            <option value="">Select payment type</option>
            <option value="PER_WORD">PER_WORD</option>
            <option value="Flat Fee">Flat Fee</option>
            <option value="Rate Based">Rate Based</option>
          </select>
        </div>

        {paymentType === "Flat Fee" && (
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="flatFee">Flat Fee</label>
            <input id="flatFee" type="number" value={flatFee} onChange={(e) => setFlatFee(e.target.value)}
              placeholder="Enter flat fee" className="w-full mt-1 px-4 py-2 border rounded-md" />
          </div>
        )}
        {paymentType === "Rate Based" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="rate">Rate</label>
              <input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)}
                placeholder="Enter rate" className="w-full mt-1 px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">Quantity</label>
              <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity" className="w-full mt-1 px-4 py-2 border rounded-md" />
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4">
          <Link to="/projects">
            <Button text="Cancel" colorClass="bg-gray-500 text-white hover:bg-gray-600" />
          </Link>
          <button type="submit" className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Update
          </button>
        </div>
      </form>
    </section>
  );
};