import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import { FilterActions } from "../FilterActions/FilterActions";
import { Table } from "../Table/Table";
import { LanguagePairRow } from "./LanguagePairRow";
import { useConfirmationAction } from "../../hooks/useConfirmationAction";
import LanguagePairService from "../../services/LanguagePairService";

export const LanguagePairList = () => {
  const [languagePairs, setLanguagePairs] = useState([]);

  const languagePairList = () => {
    LanguagePairService.getAllLanguagePairs()
      .then((response) => {
        setLanguagePairs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching language pairs:", error);
      });
  };

  const { handleDelete } = useConfirmationAction((languagePairId) => {
    LanguagePairService.deleteLanguagePair(languagePairId)
      .then(() => {
        languagePairList();
      })
      .catch((error) => {
        console.error("Error deleting language pair:", error);
        Swal.fire(
          "Error!",
          "There was an issue deleting the language pair.",
          "error"
        );
      });
  }, "delete");

  const headers = [
    "Source Language",
    "Target Language",
    "Translators",
    "Actions"
  ];

  useEffect(() => {
    languagePairList();
  }, []);

  return (
    <section className="w-[70%] mx-auto">
      <Title title="Language Pair List" />

      <div className="flex justify-between items-center my-6">
      {["ADMIN", "ROOT"].includes(localStorage.getItem("role")) && (

        <Link to="/language-pairs/register">
          <Button
            text="Add Language Pair"
            colorClass="bg-green-500 text-white hover:bg-green-600"
          />
        </Link>
        )}
        <FilterActions columns={headers}/>
      </div>

      <Table
        headers={headers}
        data={languagePairs}
        RowComponent={LanguagePairRow}
        onDelete={handleDelete}
      />
    </section>
  )
}