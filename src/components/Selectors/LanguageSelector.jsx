/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LanguageService from "../../services/LanguageService";

export const LanguageSelector = ({ onSelect, excludedLanguage }) => {
  const [allLanguages, setAllLanguages] = useState([]);
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    LanguageService.getAllLanguages()
      .then((response) => {
        console.log("Idiomas recibidos:", response.data); // Verifica los datos aquí
        setAllLanguages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredLanguages(
      allLanguages.filter((lang) => lang.value !== excludedLanguage)
    );
  }, [excludedLanguage, allLanguages]);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedLanguage(selected);
    if (onSelect) {
      onSelect(selected);
    }
  };

  return (
    <select
      value={selectedLanguage}
      onChange={handleChange}
      className="border p-2 rounded w-full"
    >
      <option value="" disabled>&lt;Select a language&gt;</option>
      {filteredLanguages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.englishName}
        </option>
      ))}
    </select>
  );
};
