import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UserRegister = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [cellphone, setCellphone] = useState("");
  const navigate = useNavigate();
  const { userEmail } = useParams();

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
    if (userEmail) {
      UserService.getUserByEmail(userEmail)
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
  }, [userEmail]);

  const title = () => {
    if (userEmail) {
      return (
        <h2 className="text-center my-8 text-3xl font-semibold">User Update</h2>
      );
    } else {
      return (
        <h2 className="text-center my-8 text-3xl font-semibold">
          User Registration
        </h2>
      );
    }
  };

  return (
    <section className="w-[35%] mx-auto bg-white">
      {title()}
      <form onSubmit={registerUser} className="space-y-6" autoComplete="on">
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
            autoComplete="given-name"
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
            autoComplete="family-name"
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
            autoComplete="email"
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
            autoComplete="new-password"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Birthdate */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="birthDate"
          >
            Birthdate
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthdate(e.target.value)}
            autoComplete="bday"
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
            autoComplete="off"
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
            type="tel"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            placeholder="Enter cellphone number"
            autoComplete="tel"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Link to="/users">
            <button
              type="reset"
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </Link>
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
