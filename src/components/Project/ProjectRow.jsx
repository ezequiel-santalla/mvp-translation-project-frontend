/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { LanguageFlag } from "../LanguageFlag/LanguageFlag";

export const ProjectRow = ({ item, onDelete, onComplete }) => {
  const formatDateTime = (date) =>
    date ? format(new Date(date), "yyyy/MM/dd HH:mm:ss") : "N/A";
  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2">{item.name}</td>
      <td className="border border-gray-300 px-4 py-2">
        {item.translator ? item.translator : "N/A"}
      </td>
      <td className="border border-gray-300 px-4 py-2">{item.taskType}</td>
      <td className="border border-gray-300 px-4 py-2">
        <div className="flex justify-around gap-2">
          {item.sourceFlag && (
            <LanguageFlag countryCode={item.sourceFlag} className="w-8 h-8" />
          )}
          <span className="flex items-center">{item.languagePair}</span>
          {item.targetFlag && (
            <LanguageFlag countryCode={item.targetFlag} className="w-8 h-8" />
          )}
        </div>
      </td>

      <td className="border border-gray-300 px-4 py-2">{item.status}</td>
      <td className="border border-gray-300 px-4 py-2">
        {formatDateTime(item.startingDate)}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {formatDateTime(item.finishedDate)}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <div className="flex justify-around gap-2">
          {["ADMIN", "ROOT"].includes(localStorage.getItem("role")) && (
            <>
              <Link to={`/projects/update/${item.id}`}>
                <Button
                  text="Update"
                  colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
                  onClick={() => console.log(`Update ${item.id}`)}
                />
              </Link>
              <Button
                text="Delete"
                colorClass="bg-red-500 text-white hover:bg-red-600"
                onClick={() => onDelete(item.id)}
              />
            </>
          )}
 {["TRANSLATOR"].includes(localStorage.getItem("role")) && (
  <Button
    text="Submit as Done"
    colorClass="bg-green-500 text-white hover:bg-green-600"
    onClick={() => {
      console.log("handleMarkAsCompleted llamado con ID:", item.id);
      console.log("onComplete llamado con ID:", item.id);
            if (onComplete) {
              onComplete(item.id);
            } else {
              console.error("onComplete no está definido");
            }
    }}
  />
)}


        </div>
      </td>
    </tr>
  );
};
