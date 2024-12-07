import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import Button from "../Button/Button";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    clientList();
  }, []);

  const clientList = () => {
    UserService.getAllUsers().then((response) => {
      setUsers(response.data);
    });
  }

  const deleteUser = (userEmail) => {
    UserService.deleteUser(userEmail).then((response) => {
      clientList();
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <section className="w-[70%] mx-auto">
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
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Last Name
            </th>
            <th className="border border-gray-300 px-4 py-2" scope="col">
              Email
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
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 py-2 flex justify-around">
                <Button
                  text="Update User"
                  route="/users/update/:id"
                  colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
                />
                <Button
                  text="Delete User"
                  colorClass="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => deleteUser(user.email)}
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
