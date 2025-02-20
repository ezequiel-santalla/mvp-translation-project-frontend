import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

export const UserRow = ({ item, onDelete }) => (
  <tr>
    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
    <td className="border border-gray-300 px-4 py-2">{item.lastName}</td>
    <td className="border border-gray-300 px-4 py-2">{item.email}</td>
    <td className="border border-gray-300 px-4 py-2">{item.identityNumber}</td>
    <td className="border border-gray-300 px-4 py-2">{item.cellphone}</td>
    <td className="border border-gray-300 px-4 py-2">
      <Link
        to={{
          pathname: `/users/projects/${item.email}`,
        }}
        state={{ name: item.name, lastName: item.lastName, email: item.email, id: item.id }} // Pasa el email
        className="text-blue-500 hover:underline"
      >
        View Projects
      </Link>
    </td>
    <td className="border border-gray-300 px-4 py-2">
      <div className="flex justify-around gap-2">
        <Link to={`/users/update/${item.id}`}>
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
      </div>
    </td>
  </tr>
);
