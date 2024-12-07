import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [cellphone, setCellphone] = useState("");
  const navigate = useNavigate();
  const { clientEmail } = useParams();

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      name,
      lastName,
      email,
      password,
      birthDate,
      identityNumber,
      cellphone,
    };

    UserService.registerUser(user)
      .then((response) => {
        console.log(response.data);
        navigate("/users");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (clientEmail) {
      UserService.getUserByEmail(clientEmail)
        .then((response) => {
          setName(response.data.name);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPassword(response.data.password);
          setBirthdate(response.data.birthDate);
          setIdentityNumber(response.data.identityNumber);
          setCellphone(response.data.cellphone);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const title = () => {
    if (clientEmail) {
      return <h2 className="text-center my-8 text-3xl font-semibold">User Update</h2>
    } else {
      return <h2 className="text-center my-8 text-3xl font-semibold">User Registration</h2>
    }
  };

  return (
    <section className="w-[35%] mx-auto bg-white">
      {title()}
      <form onSubmit={registerUser} className="space-y-6">
        {/* Name */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            First Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter first name"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Birthdate */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="birthdate"
          >
            Birthdate
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Identity Number */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="identityNumber"
          >
            Identity Number
          </label>
          <input
            id="identityNumber"
            type="text"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            placeholder="Enter identity number"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Cellphone */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="cellphone"
          >
            Cellphone
          </label>
          <input
            id="cellphone"
            type="text"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            placeholder="Enter cellphone number"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="reset"
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserRegister;
