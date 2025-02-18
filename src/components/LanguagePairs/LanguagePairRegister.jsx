import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import LanguagePairService from "../../services/LanguagePairService";

export const LanguagePairRegister = () => {
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const navigate = useNavigate();

  const registerLanguagePair = (e) => {
    e.preventDefault();

    const languagePair = {
      sourceLanguage: sourceLanguage.toUpperCase(),
      targetLanguage: targetLanguage.toUpperCase(),
    };

    LanguagePairService.registerLanguagePair(languagePair)
      .then(() => {
        navigate("/language-pairs");
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <section className="w-[35%] mx-auto bg-white">
      <Title title="Language Pair Registration" />

      <form
        onSubmit={registerLanguagePair}
        className="space-y-6"
        autoComplete="on"
      >
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="sourceLanguage"
          >
            Source Language
          </label>
          <input
            id="sourceLanguage"
            type="text"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            placeholder="Enter Source Language"
            autoComplete="source-language"
            className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="targetLanguage"
          >
            Target Language
          </label>
          <input
            id="targetLanguage"
            type="text"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            placeholder="Enter Target Language"
            autoComplete="target-language"
            className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Link to="/language-pairs">
            <Button
              text="Cancel"
              colorClass="bg-gray-500 text-white hover:bg-gray-600"
            />
          </Link>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
};
