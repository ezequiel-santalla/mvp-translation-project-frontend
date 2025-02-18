import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import UserService from "../../services/UserService";

export const UserUpdate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [cellphone, setCellphone] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      UserService.getUserById(userId)
        .then((response) => {
          setName(response.data.name);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setBirthdate(response.data.birthDate);
          setIdentityNumber(response.data.identityNumber);
          setCellphone(response.data.cellphone);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  const updateUser = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUser = {
          name,
          lastName,
          email,
          birthDate,
          identityNumber,
          cellphone,
        };

        UserService.updateUser(email, updatedUser)
          .then(() => {
            Swal.fire(
              'Updated!',
              'The user has been updated.',
              'success'
            ).then(() => {
              navigate("/users");
            });
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'There was an error updating the user.',
              'error'
            );
            console.log(error.response.data);
          });
      }
    });
  };

  return (
    <section className="w-[35%] mx-auto bg-white">
      <Title title="User Update" />
      <form onSubmit={updateUser} className="space-y-6" autoComplete="on">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">First Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Enter first name" autoComplete="given-name" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name" autoComplete="family-name" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email" autoComplete="email" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="birthDate">Birthdate</label>
          <input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthdate(e.target.value)}
            autoComplete="bday" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="identityNumber">Identity Number</label>
          <input id="identityNumber" type="text" value={identityNumber} onChange={(e) => setIdentityNumber(e.target.value)}
            placeholder="Enter identity number" autoComplete="off" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="cellphone">Cellphone</label>
          <input id="cellphone" type="tel" value={cellphone} onChange={(e) => setCellphone(e.target.value)}
            placeholder="Enter cellphone number" autoComplete="tel" className="w-full mt-1 px-4 py-2 border rounded-md" />
        </div>

        <div className="flex justify-end space-x-4">
          <Link to="/users">
            <Button text="Cancel" colorClass="bg-gray-500 text-white hover:bg-gray-600" />
          </Link>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md">
            Update
          </button>
        </div>
      </form>
    </section>
  );
};