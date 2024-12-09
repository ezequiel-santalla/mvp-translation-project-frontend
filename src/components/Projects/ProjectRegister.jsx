import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProjectService from "../../services/ProjectService";

export const ProjectRegister = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filePath, setFilePath] = useState("");
  const [taskType, setTaskType] = useState("");
  const [languagePair, setLanguagePair] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [flatFee, setFlatFee] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleProjectSubmit = (e) => {
    e.preventDefault();

    const project = {
      name,
      description,
      deadline,
      filePath,
      taskType,
      languagePair,
      paymentType,
      flatFee: paymentType === "Flat Fee" ? flatFee : null,
      rate: paymentType === "Rate Based" ? rate : null,
      quantity: paymentType === "Rate Based" ? quantity : null,
    };

    ProjectService.registerProject(project)
      .then(() => {
        navigate("/projects");
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  };

  return (
    <section className="w-[35%] mx-auto bg-white">
      <h2 className="text-center my-8 text-3xl font-semibold">
        Project Registration
      </h2>
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
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="Enter file path"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="taskType">
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
          <label className="block text-sm font-medium" htmlFor="languagePair">
            Language Pair
          </label>
          <input
            id="languagePair"
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={languagePair}
            onChange={(e) => setLanguagePair(e.target.value)}
            placeholder="Enter language pair"
            required
          />
        </div>
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
            <option value="">Select payment type</option>
            <option value="Flat Fee">Flat Fee</option>
            <option value="Rate Based">Rate Based</option>
          </select>
        </div>
        {paymentType === "Flat Fee" && (
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="flatFee"
            >
              Flat Fee
            </label>
            <input
              id="flatFee"
              type="number"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={flatFee}
              onChange={(e) => setFlatFee(e.target.value)}
              placeholder="Enter flat fee"
              required
            />
          </div>
        )}
        {paymentType === "Rate Based" && (
          <>
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
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
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