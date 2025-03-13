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
    const selected = JSON.parse(event.target.value); // Convertimos el string a objeto
    console.log("selectedLanguagePair:", selected);
  
    setSelectedLanguagePair(event.target.value); // Guardamos la versión string en el estado
  
    if (onSelect) {
      onSelect({
        sourceLanguage: selected.sourceLanguage.value, // Solo enviamos el nombre
        targetLanguage: selected.targetLanguage.value
      });
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
        <option key={item.id} value={JSON.stringify(item)}>
          {`${item.sourceLanguage.value} - ${item.targetLanguage.value}`}
        </option>
      ))}
    </select>
  );
};
//