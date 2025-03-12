import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import LanguagePairService from "../../services/LanguagePairService";
import { LanguageSelector } from "../Selectors/LanguageSelector";

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
          <LanguageSelector 
          onSelect={setSourceLanguage} 
          excludedLanguage={targetLanguage}/>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="targetLanguage"
          >
            Target Language
            </label>
          <LanguageSelector 
          onSelect={setTargetLanguage}
          excludedLanguage={sourceLanguage}/>

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
