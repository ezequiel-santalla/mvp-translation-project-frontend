import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Title } from "../Title/Title";
import UserService from "../../services/UserService";
import { Button } from "../Button/Button";

export const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthdate] = useState("");
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
      return <Title title="User Update" />;
    } else {
      return <Title title="User Registration" />;
    }
  };

  return (
    <section className="w-[35%] mx-auto bg-white">
      {title()}
      <form onSubmit={registerUser} className="space-y-6" autoComplete="on">
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

        <div className="flex justify-end space-x-4">
          <Link to="/users">
            <Button
              text="Cancel"
              colorClass="bg-gray-500 text-white hover:bg-gray-600"
            />
          </Link>
          <Button
            text="Register"
            colorClass="bg-indigo-600 text-white hover:bg-indigo-700"
          />
        </div>
      </form>
    </section>
  );
};
