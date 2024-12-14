import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import { FilterActions } from "../FilterActions/FilterActions";
import { Table } from "../Table/Table";
import { UserRow } from "../User/UserRow";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import UserService from "../../services/UserService";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  const userList = () => {
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const { handleDelete } = useDeleteConfirmation((userEmail) => {
    UserService.deleteUser(userEmail)
      .then(() => {
        userList();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "There was an issue deleting the user.", "error");
      });
  });

  const headers = [
    "Name",
    "Last name",
    "Email",
    "Identity Number",
    "Cellphone",
    "Projects",
    "Actions",
  ];

  useEffect(() => {
    userList();
  }, []);

  return (
    <section className="w-[90%] mx-auto">
      <Title title="User List" />

      <div className="flex justify-between items-center my-6">
        <Link to="/users/register">
          <Button
            text="Add User"
            colorClass="bg-green-500 text-white hover:bg-green-600"
          />
        </Link>
        <FilterActions columns={headers}/>
      </div>

      <Table
        headers={headers}
        data={users}
        RowComponent={UserRow}
        onDelete={handleDelete}
      />
    </section>
  );
};
