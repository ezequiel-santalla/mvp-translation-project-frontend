import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";


export const ProjectRow = ({ item, onDelete }) => {
  const formatDateTime = (date) =>
    date ? format(new Date(date), "yyyy/MM/dd HH:mm:ss") : "N/A";

  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
        <Link to={`/projects/${item.id}`}>{item.name}</Link>
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {item.translator
          ? `${item.translator.name} ${item.translator.lastName}`
          : "N/A"}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {formatDateTime(item.startingDate)}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {formatDateTime(item.finishedDate)}
      </td>
      <td className="border border-gray-300 px-4 py-2">{item.status}</td>
      <td className="border border-gray-300 px-4 py-2">{item.taskType}</td>
      <td className="border border-gray-300 py-2 flex justify-around">
        <Button
          text="Update"
          colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={() => console.log(`Update ${item.id}`)}
        />
        <Button
          text="Delete"
          colorClass="bg-red-500 text-white hover:bg-red-600"
          onClick={() => onDelete(item.id)}
        />
      </td>
    </tr>
  );
};
