import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa el componente Link
import UserService from "../../services/UserService"; // Asegúrate de tener el servicio adecuado
import Button from "../Button/Button";
import UserDelete from "../Users/UserDelete"; // Si tienes un componente para eliminar usuarios

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userList();
  }, []);

  const userList = () => {
    UserService.getAllUsers()
      .then((response) => {
        console.log("Users data:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  return (
    <section className="w-[80%] mx-auto">
      <h2 className="flex justify-center my-8 text-3xl font-semibold">
        User List
      </h2>
      <div className="flex justify-between items-center my-6">
        <Button
          text="Add User"
          route="/users/register"
          colorClass="bg-green-500 text-white hover:bg-green-600"
        />

        <div className="flex items-center space-x-4">
          <Button
            text="Filter"
            colorClass="bg-blue-500 text-white hover:bg-blue-600"
          />
          <Button
            text="Reset filter"
            colorClass="bg-gray-500 text-white hover:bg-gray-600"
          />
        </div>
      </div>

      <table className="mt-8 w-full table-auto border-collapse border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Last name
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Identity Number
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Cellphone
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Role
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
                <Link to={`/users/${user.email}`}>{user.email}</Link>{" "}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.identityNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.cellphone}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 py-2 flex justify-around">
                <Button
                  text="Update"
                  route={`/users/update/${user.email}`}
                  colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
                />
                <UserDelete
                  userEmail={user.email}
                  onDelete={userList} // Actualiza la lista después de eliminar un usuario
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserList;
