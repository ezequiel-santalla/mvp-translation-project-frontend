/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LanguagePairService from "../../services/LanguagePairService";

export const LanguagePairSelector = ({ onSelect }) => {
  const [allLanguagePairs, setAllLanguagePairs] = useState([]);
  const [selectedLanguagePair, setSelectedLanguagePair] = useState("");

  useEffect(() => {
    LanguagePairService.getAllLanguagePairs()
      .then((response) => {
        console.log("Pares de Idiomas recibidos:", response.data); // Verifica los datos aquí
        setAllLanguagePairs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  const handleChange = (event) => {
    console.log("selectedLanguagePair: "+selectedLanguagePair);
    const selected = event.target.value;
    setSelectedLanguagePair(selected);
    if (onSelect) {
      onSelect(selected);
    }
  };

  return (
    <select
      value={selectedLanguagePair}
      onChange={handleChange}
      className="border p-2 rounded w-full"
    >
      <option value="" disabled>&lt;Select a language pair&gt;</option>
      {allLanguagePairs.map((item) => (
        <option key={item.id} value={item}>
          {`${item.sourceLanguage.value} - ${item.targetLanguage.value}`}
        </option>
      ))}
    </select>
  );
};
//