import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

export const UserRow = ({ item, onDelete }) => (
  <tr>
    <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
      <Link to={`/users/email/${item.email}`}>{item.email}</Link>
    </td>
    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
    <td className="border border-gray-300 px-4 py-2">{item.lastName}</td>
    <td className="border border-gray-300 px-4 py-2">{item.identityNumber}</td>
    <td className="border border-gray-300 px-4 py-2">{item.cellphone}</td>
    <td className="border border-gray-300 px-4 py-2">{item.role}</td>
    <td className="border border-gray-300 py-2 flex justify-around">
      <Link to={`/users/update/${item.email}`}>
        <Button
          text="Update"
          colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
        />
      </Link>
      <Button
        text="Delete"
        colorClass="bg-red-500 text-white hover:bg-red-600"
        onClick={() => onDelete(item.email)}
      />
    </td>
  </tr>
);
