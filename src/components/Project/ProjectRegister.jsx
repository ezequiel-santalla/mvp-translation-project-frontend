import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import { format } from "date-fns";
import ProjectService from "../../services/ProjectService";
import { LanguagePairSelector } from "../Selectors/LanguagePairSelector";

export const ProjectRegister = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filePath, setFilePath] = useState("");
  const [taskType, setTaskType] = useState("");
  const [languagePair, setLanguagePair] = useState({sourceLanguage: "", targetLanguage: ""});
  //const [sourceLanguage, setSourceLanguage] = useState("");
 // const [targetLanguage, setTargetLanguage] = useState("");
  const [projectPayment, setProjectPayment] = useState("");
  const [flatFee, setFlatFee] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const navigate = useNavigate();

  const handleProjectSubmit = (e) => {
    e.preventDefault();

    const formattedDeadline = format(
      new Date(deadline),
      "yyyy-MM-dd'T'HH:mm:ss"
    );

    const project = {
      name,
      description,
      deadline: formattedDeadline,
      filePath,
      taskType,
      languagePair: {
        sourceLanguage: languagePair.sourceLanguage,
        targetLanguage: languagePair.targetLanguage,
      },
      projectPayment:
        projectPayment === "Flat Fee"
          ? { type: "FlatFee", cost: flatFee }
          : { type: "RateBased", rate, paymentType, quantity },
    };

    ProjectService.registerProject(project)
      .then(() => {
        navigate("/projects");
        console.log("Projectbeing sent:", project);
        console.log("Project Payment being sent:", projectPayment);
      })
      .catch((error) => {
        console.log("Projectbeing sent:", project);
        console.log("Project Payment being sent:", projectPayment);
        console.log(error.response.data);
      });
  };

  return (
    <section className="w-[35%] mx-auto bg-white">
      <Title title="Project Registration" />

      <form onSubmit={handleProjectSubmit} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Project Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="deadline"
          >
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="filePath"
          >
            File Path
          </label>
          <input
            id="filePath"
            type="file"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="Enter file path"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="taskType"
          >
            Task Type
          </label>
          <select
            id="taskType"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            required
          >
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
          <label className="block text-sm font-medium" htmlFor="sourceLanguage">
            Language Pair
          </label>
          <LanguagePairSelector
            onSelect={({ sourceLanguage, targetLanguage }) =>{
              console.log("source language "+sourceLanguage);
              setLanguagePair({ sourceLanguage, targetLanguage })
              console.log("source language "+sourceLanguage);

              console.log("language pair"+languagePair);

            }
              
            }
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="projectPayment"
          >
            Payment Method
          </label>
          <select
            id="projectPayment"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={projectPayment}
            onChange={(e) => setProjectPayment(e.target.value)}
            required
          >
            <option value="" disabled>
              &lt;Select payment method&gt;
            </option>
            <option value="Flat Fee">Flat Fee</option>
            <option value="Rate Based">Rate Based</option>
          </select>
        </div>

        {projectPayment === "Flat Fee" && (
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="cost"
            >
              Cost
            </label>
            <input
              id="cost"
              type="number"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={flatFee}
              onChange={(e) => setFlatFee(e.target.value)}
              placeholder="Enter cost"
              required
            />
          </div>
        )}
        {projectPayment === "Rate Based" && (
          <>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="paymentType"
              >
                Payment Type
              </label>
              <select
                id="paymentType"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                required
              >
                <option value="" disabled>
                  &lt;Select payment type&gt;
                </option>
                <option value="PER_WORD">Per word</option>
                <option value="PER_HOUR">Per hour</option>
                <option value="PER_MINUTE">Per minute</option>
                <option value="PER_PAGE">Per page</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="rate"
              >
                Rate
              </label>
              <input
                id="rate"
                type="number"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter rate"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4">
          <Link to="/projects">
            <Button
              text="Cancel"
              colorClass="bg-gray-500 text-white hover:bg-gray-600"
            />
          </Link>
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
};
