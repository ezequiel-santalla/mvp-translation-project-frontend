/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";
import { FilterActions } from "../FilterActions/FilterActions";
import { Table } from "../Table/Table";
import { UserRow } from "../User/UserRow";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import UserService from "../../services/UserService";

export const UserList = () => {

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
 
  const location = useLocation();
  const { name, lastName, email } = location.state || {};


  const userList = () => {
    let fetchUsers;
    
    if (localStorage.getItem("role") === "TRANSLATOR") {
      fetchUsers = UserService.getMyUser();
        
    } else {
      fetchUsers = UserService.getAllUsers()
    }

    fetchUsers
    .then((response) => {
      const userData = Array.isArray(response.data) ? response.data : [response.data]; // Normaliza a array
      setUsers(userData);
      setFilteredUsers(userData);
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
  };


  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+(\w)/g, (match, letter) => letter.toUpperCase());
  };
  
  const handleFilter = (column, value) => {
    if (!column || value == null) return;
  
    let lowercasedValue = typeof value === "string" ? value.toLowerCase() : value;
    const camelCaseColumn = toCamelCase(column);
    const filtered = users.filter((user) => {
      
      let columnValue = user[camelCaseColumn];
  
      if(camelCaseColumn.includes("Date")){
        lowercasedValue = lowercasedValue.replace(/\//,"-");
      } 
  
      // Convierte a minúsculas solo si es un string
      const normalizedColumnValue = typeof columnValue === "string" ? columnValue.toLowerCase() : columnValue;
     
      return normalizedColumnValue?.includes(lowercasedValue);
    });
  
    
    setFilteredUsers(filtered);
  };
  
    const handleReset = () => {
      setFilteredUsers(users); // Vuelve a mostrar todos los proyectos
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

  const filters = [
    "Name",
    "Last name",
    "Email",
    "Identity Number",
    "Cellphone",
  ];

  useEffect(() => {
    userList();
  }, []);

  return (
    <section className="w-[90%] mx-auto">
      <Title title="User List" />

      <div className="flex justify-between items-center my-6">
      {["ADMIN", "ROOT"].includes(localStorage.getItem("role")) && (

        <Link to="/users/register">
          <Button
            text="Add User"
            colorClass="bg-green-500 text-white hover:bg-green-600"
          />
        </Link>
      )}
        <FilterActions columns={filters} onFilter={handleFilter} onReset={handleReset}/>
      </div>

      <Table
        headers={headers}
        data={filteredUsers}
        RowComponent={UserRow}
        onDelete={handleDelete}
      />
    </section>
  );
};
